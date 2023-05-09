import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import apiClient from '../../services/apiClient';
import ProjectList from './ProjectList';
import ProjectSelection from './ProjectSelection';
import UserBanner from './UserBanner';
import { Project, User } from '../../types/types';


interface FetchUserResponse {
	user: User;
}

const Projects = () => {
	const [user, setUser] = useState<User | null>(null);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		apiClient
			.get<FetchUserResponse>('/users/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => setUser(res.data.user))
			.catch((err) => setError(err.message));
	}, []);

	const handleProjectCardClick = (project: Project) => {
		setSelectedProject(project);
	};

	const projectsList = user ? <ProjectList projectIds={user.projects} onProjectCardClick={handleProjectCardClick}  /> : null;
	const projectSelectionArea = selectedProject ? <ProjectSelection selectedProject={selectedProject} /> : <ProjectSelection selectedProject={null} />;

	return (
		<>
			<Grid container height="100vh" minHeight="800px" width="100%" bgcolor="bg.dark">
				<Grid container item xs={12} md={8} lg={9} p={4} order={{ xs: 2, md: 1 }} height={{ xs: '60%', md: '100%' }}>
					<Grid item xs={12} height="25%" pb={3} sx={{ boxSizing: 'border-box', display: { xs: 'none', md: 'block' } }}>
						<UserBanner user={user} />
					</Grid>
					<Grid container item xs={12} height={{ xs: '55%', md: '30%' }}>
						<Grid item xs={12} md={5} bgcolor="bg.dark">
							<Typography variant="h4" color="typography.main">
								Create a new project
							</Typography>
						</Grid>
						<Grid item xs={12} md={5} bgcolor="bg.dark">
							<Typography variant="h4" color="typography.main">
								Join an existing project
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} height="45%">
						<Typography variant="h4" color="typography.main">
							Your project list
						</Typography>
						{projectsList}
					</Grid>
				</Grid>
				<Grid item xs={12} md={4} lg={3} order={{ xs: 1, md: 2 }} p={4} height={{ xs: '40%', md: '100%' }} bgcolor="bg.main">
					{projectSelectionArea}
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
