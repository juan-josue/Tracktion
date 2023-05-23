import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Project, User } from '../../types/types';
import refreshAccessToken from '../../services/refreshAccessToken';
import apiClient from '../../services/apiClient';

import UserBanner from './UserBanner';
import ProjectList from './ProjectList';
import ProjectSelection from './ProjectSelection';
import NewProjectForm from './NewProjectForm';
import JoinProjectForm from './JoinProjectForm';
import Modal from '../../components/Modal';

interface FetchUserResponse {
	user: User;
}

const Projects = () => {
	const [user, setUser] = useState<User | null>(null);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Get access token from local storage
		const accessToken = localStorage.getItem('access_token');

		// Make a request to fetch the logged in user
		apiClient
			.get<FetchUserResponse>('/users/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => setUser(res.data.user))
			.catch(async (err) => {
				// If the status is 401 (Unauthorized), try and refresh the access token
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						// If refreshing succeeded, update local storage and retry fetching the user
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.get<FetchUserResponse>('/users/me', {
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
							})
							.then((res) => setUser(res.data.user))
							.catch(() => navigate('/login'));
					} else {
						// If refreshing the access token failed, navigate back to login
						navigate('/login');
					}
				} else {
					// If there was an error getting the user navigate back to login
					navigate('/login');
				}
			});
	}, [navigate]);

	const handleProjectCardClick = (project: Project) => {
		setSelectedProject(project);
	};

	if (!user) {
		navigate('/login');
		return null;
	}

	return (
		<Grid
			container
			minHeight="100vh"
			height="auto"
			bgcolor="bg.main"
			p={2}
			boxSizing="border-box"
			overflow="hidden"
		>
			{/* project list, user banner, join and create controls */}
			<Grid container item xs={12} md={8} lg={9} order={{ xs: 2, md: 1 }}>
				{/* user banner */}
				<Grid item xs={12} md={6} height={{ xs: 'auto', md: '50vh' }}>
					<Box
						bgcolor="primary.light"
						p={2}
						borderRadius="15px"
						height={{ xs: 'auto', md: '100%' }}
						mr={{ xs: 0, md: 2 }}
					>
						<UserBanner user={user} />
					</Box>
				</Grid>
				{/* join and create controls */}
				<Grid
					container
					item
					xs={12}
					md={6}
					height="calc(50vh - 16px)"
					mt={{ xs: 2, md: 0 }}
					gap={2}
				>
					{/* create project control */}
					<Grid item xs={12} height="40%">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							bgcolor="bg.light"
							p={2}
							borderRadius="15px"
							height="100%"
						>
							<Typography variant="h5" color="typography.main" fontWeight="bold">
								Begin A New Odyssey
							</Typography>
							<Modal
								buttonText="Create Project"
								content={<NewProjectForm/>}
							/>
						</Box>
					</Grid>
					{/* join project control */}
					<Grid item xs={12} height="60%">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							bgcolor="bg.light"
							p={2}
							borderRadius="15px"
							height="100%"
						>
							<Typography variant="h5" color="typography.main" fontWeight="bold">
								Join An Odyssey With A Code
							</Typography>
							<JoinProjectForm userId={user._id} />
						</Box>
					</Grid>
				</Grid>
				<Grid item xs={12} height="calc(50% - 32px)" mt={2}>
					<Box
						display={'flex'}
						alignItems="center"
						bgcolor="bg.light"
						p={2}
						mt={{ xs: 2, md: 0 }}
						borderRadius="15px"
						height={{ xs: 'auto', md: '100%' }}
					>
						<ProjectList
							projectIds={user.projects}
							onProjectCardClick={handleProjectCardClick}
						/>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12} md={4} lg={3} order={{ xs: 1, md: 2 }} mb={{ xs: 2, md: 0 }}>
				<Box
					bgcolor="bg.light"
					height="100%"
					p={2}
					borderRadius="15px"
					ml={{ xs: 0, md: 2 }}
				>
					<ProjectSelection selectedProject={selectedProject ? selectedProject : null} />
				</Box>
			</Grid>
		</Grid>
	);
};

export default Projects;
