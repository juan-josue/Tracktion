import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectBox from './ProjectBox';
import refreshAccessToken from '../../services/refreshAccessToken';

interface User {
	_id: string;
	name: string;
	email: string;
	projects: string[];
}

interface Project {
	_id: string;
	description: string;
	joinCode: string;
	name: string;
	owner: string;
}

const Projects = () => {
	// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			navigate('/login');
			return;
		}

		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:3000/api/users/me', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setUser(data.user);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.log('expired token probably');
					const refreshToken = localStorage.getItem('refresh_token');
					if (!refreshToken) {
						console.error('Refresh token is null');
						return;
					}
					const newAccessToken = await refreshAccessToken(refreshToken);
					if (!newAccessToken) {
						console.error('Could not refresh access token');
						return;
					}
					const { data } = await axios.get('/api/user/me', {
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
						},
					});
					setUser(data.user);
				} else {
					console.error(error);
				}
			}
		};

		fetchData();
	}, [navigate]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/projects');
				setProjects(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProjects();
	}, []);

	return (
		<>
			{/* <Grid item xs={12} bgcolor={'primary.dark'} height={'50px'}>
				<SideBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
			</Grid> */}
			<Grid container height="100vh" width="100%" bgcolor="bg.dark">
				{/* project selection */}
				<Grid
					container
					item
					xs={12}
					md={8}
					lg={9}
					p={4}
					order={{ xs: 2, md: 1 }}
					height={{ xs: '60%', md: '100%' }}
				>
					{/* user banner */}
					<Grid
						item
						xs={12}
						height="25%"
						pb={3}
						sx={{ boxSizing: 'border-box', display: { xs: 'none', md: 'block' } }}
					>
						<Box height="100%" width="100%" p={2} borderRadius="15px" bgcolor="secondary.main">
							{user && (
								<Typography variant="h4" color="typography.main">
									Welcome, {user.name}!
								</Typography>
							)}
						</Box>
					</Grid>
					{/* new and join project forms */}
					<Grid container item xs={12} height={{ xs: '55%', md: '30%' }}>
						{/* new project */}
						<Grid item xs={12} md={5} bgcolor="bg.dark">
							<Typography variant="h4" color="typography.main">
								Create a new project
							</Typography>
						</Grid>
						{/* join project */}
						<Grid item xs={12} md={5} bgcolor="bg.dark">
							<Typography variant="h4" color="typography.main">
								Join an existing project
							</Typography>
						</Grid>
					</Grid>
					{/* user projects list */}
					<Grid item xs={12} height="45%">
						<Typography variant="h4" color="typography.main">
							Your project list
						</Typography>
						<Stack direction="row" spacing={5} mt={2} sx={{ overflowY: 'hidden' }}>
							{projects.map((project) => (
								<ProjectBox key={project._id} project={project} />
							))}
						</Stack>
					</Grid>
				</Grid>
				{/* selected project */}
				<Grid
					item
					xs={12}
					md={4}
					lg={3}
					order={{ xs: 1, md: 2 }}
					p={4}
					height={{ xs: '40%', md: '100%' }}
					bgcolor="bg.main"
				>
					<Typography variant="h4" color="typography.main">
						Current selection
					</Typography>
					<Box my={3} display="flex" justifyContent="center">
						{/* <ProjectBox></ProjectBox> */}
					</Box>
					<Box display={{ xs: 'none', md: 'block' }}>
						<Typography variant="h4" color="typography.main">
							Project description
						</Typography>
						<Typography variant="body1" color="typography.main">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi rerum
							similique doloribus ut magni? Illo, sunt libero maxime, itaque voluptates
							reiciendis nostrum doloribus perferendis porro suscipit quibusdam. Facilis fugit
							incidunt aut deserunt at similique corporis repellendus veniam eius illum?
						</Typography>
					</Box>
					<Box display="flex" justifyContent={{ xs: 'center', md: 'left' }} mt={3}>
						<Button variant="contained" color="secondary" size="large" endIcon={<PlayIcon />}>
							Play Project
						</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
