import { Grid, Typography } from '@mui/material';
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
	const [error, setError] = useState('');

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
							.catch((err) => setError(err.message));
					} else {
						// If refreshing the access token failed, navigate back to login
						navigate('/login');
					}
				} else {
					setError(err.message);
				}
			});
	}, [navigate]);

	const handleProjectCardClick = (project: Project) => {
		setSelectedProject(project);
	};

	const projectsList = user ? (
		<ProjectList projectIds={user.projects} onProjectCardClick={handleProjectCardClick} />
	) : null;
	const projectSelectionArea = selectedProject ? (
		<ProjectSelection selectedProject={selectedProject} />
	) : (
		<ProjectSelection selectedProject={null} />
	);
	const joinProjectForm = user ? <JoinProjectForm userId={user._id} /> : null;

	return (
		<>
			<Grid container height="100vh" width="100%" bgcolor="bg.dark">
				<Grid
					container
					item
					xs={12}
					md={8}
					lg={9}
					p={4}
					order={{ xs: 2, md: 1 }}
				>
					<Grid
						item
						xs={12}
						height="25%"
						pb={3}
						sx={{ boxSizing: 'border-box', display: { xs: 'none', md: 'block' } }}
					>
						<UserBanner user={user} />
					</Grid>
					<Grid
						container
						item
						pt={{ xs: 0, md: 4 }}
						xs={12}
						height={{ xs: '55%', md: '30%' }}
					>
						<Grid item xs={12} md={5}>
							<Typography variant="h4" color="typography.main">
								Create A New Project
							</Typography>
							<Modal buttonText='Create Project' content={<NewProjectForm/>}/>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography variant="h4" color="typography.main">
								Join A Project
							</Typography>
							{joinProjectForm}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4" color="typography.main">
							Your Project List
						</Typography>
						{projectsList}
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					md={4}
					lg={3}
					order={{ xs: 1, md: 2 }}
					p={4}
					bgcolor="bg.main"
				>
					{projectSelectionArea}
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
