import { Box, Button, Grid, LinearProgress, Stack, Typography, linearProgressClasses, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import apiClient from '../../services/apiClient';
import { Project } from '../../types/types';
import refreshAccessToken from '../../services/refreshAccessToken';
import TaskGrid from './TaskGrid';
import Modal from '../../components/Modal';
import NewTaskForm from './NewTaskForm';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 20,
	borderRadius: 10,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.accent.dark,
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
	},
}));

const Tasks = () => {
	const location = useLocation();
	const projectId = location.state?.projectId;
	const [project, setProject] = useState<Project>();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		apiClient
			.get<Project>(`/projects/${projectId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				params: {
					populateTasks: 'true',
				},
			})
			.then((res) => setProject(res.data))
			.catch(async (err) => {
				// If the status is 401 (Unauthorized), try and refresh the access token
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						// If refreshing succeeded, update local storage and retry posting member
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.post(`/projects/${projectId}`, {
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
								params: {
									populateTasks: true,
								},
							})
							.then((res) => setProject(res.data))
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						// If refreshing the access token failed, navigate back to login
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});
	}, [navigate, projectId]);

	if (!project) {
		return (
			<Typography variant="body1" color="error">
				No project
			</Typography>
		);
	}

	return (
		<>
			<Box minHeight="100vh" bgcolor="bg.main" p={2} boxSizing="border-box">
				<Box bgcolor="bg.light" borderRadius="15px">
					<Grid container>
						<Grid item xs={12} md={6} p={2}>
							<Stack direction="column" spacing={2}>
								<Typography variant="h3">{project.name}</Typography>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h5">Level 7</Typography>
									<Typography variant="h5">14/20 XP</Typography>
								</Stack>
								<BorderLinearProgress variant="determinate" value={70} />
								<Box sx={{ maxWidth: 150 }}>
									<Modal buttonText="New Quest" content={<NewTaskForm projectId={project._id} />} />
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}></Grid>
					</Grid>
				</Box>
				<Box bgcolor="bg.light" borderRadius="15px" mt={2} p={2}>
					<Typography variant="h3" mb={2}>
						Quests
					</Typography>
					<TaskGrid tasks={project.tasks} />
				</Box>
			</Box>
		</>
	);
};

export default Tasks;
