import { Box, Button, Grid, LinearProgress, Stack, Typography, linearProgressClasses, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from 'react';

import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';
import { Member, Project } from '../../types/types';
import TaskGrid from './TaskGrid';
import NewTaskForm from './NewTaskForm';
import Modal from '../../components/Modal';

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
	const userId = location.state?.userId;

	const [member, setMember] = useState<Member>();
	const [project, setProject] = useState<Project>();
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		apiClient
			.get<Project>(`/projects/${projectId}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
				params: { populateTasks: 'true', populateMembers: 'true' },
			})
			.then((res) => {
				setProject(res.data);
				res.data.members.forEach((member: Member) => {
					if (member.user._id === userId) {
						setMember(member);
					}
				});
			})
			.catch(async (err) => {
				if (err.response && err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						apiClient
							.get<Project>(`/projects/${projectId}`, {
								headers: { Authorization: `Bearer ${newAccessToken}` },
								params: { populateTasks: 'true', populateMembers: 'true' },
							})
							.then((res) => {
								setProject(res.data);
								res.data.members.forEach((member: Member) => {
									if (member.user === userId) {
										setMember(member);
									}
								});
							})
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});
	}, [navigate, projectId, userId]);

	if (!project) {
		return (
			<Typography variant="body1" color="error">
				No project
			</Typography>
		);
	}

	if (!member) {
		return (
			<Typography variant="body1" color="error">
				No member
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
									<Typography variant="h5">{'Level ' + member.level}</Typography>
									<Typography variant="h5">{member.xp + '/' + member.xpCap + ' XP'}</Typography>
								</Stack>
								<BorderLinearProgress variant="determinate" value={(member.xp / member.xpCap) * 100} />
								<Box sx={{ maxWidth: 150 }}>
									<Modal
										button={
											<Button variant="contained" color="secondary" endIcon={<AddBoxIcon />}>
												New Quest
											</Button>
										}
										content={<NewTaskForm members={project.members} projectId={project._id} />}
									/>
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
					<TaskGrid members={project.members} tasks={project.tasks} />
				</Box>
			</Box>
		</>
	);
};

export default Tasks;
