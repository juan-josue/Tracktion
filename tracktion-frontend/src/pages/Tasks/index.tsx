import { Box, Button, Grid, LinearProgress, Stack, Typography, linearProgressClasses, styled } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';

import TaskGrid from './TaskGrid';
import NewTaskForm from './NewTaskForm';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import LeaderBoard from './LeaderBoard';
import FilterControls from './FilterControls';
import useProject from '../../hooks/useProject';

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
	const [idOrder, setIdOrder] = useState('Ascending');
	const [priority, setPriority] = useState('');
	const [status, setStatus] = useState('');
	const { member, project, errorMessage } = useProject();

	const handleIdOrderChange = (newIdOrder: string) => {
		setIdOrder(newIdOrder);
	};

	const handlePriorityChange = (newPriority: string) => {
		setPriority(newPriority);
	};

	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus);
	};

	if (!project || !member) {
		return (
			<Typography variant="body1" color="error">
				No project or member found.
			</Typography>
		);
	}

	return (
		<>
			{errorMessage && (
				<Typography variant="body1" color="error">
					{errorMessage}
				</Typography>
			)}
			<Box minHeight="100vh" bgcolor="bg.main" p={2} boxSizing="border-box">
				<Box bgcolor="bg.light" borderRadius="15px">
					<Navbar />
				</Box>
				<Box bgcolor="bg.light" borderRadius="15px" mt={2}>
					<Grid container>
						<Grid item xs={12} lg={6} p={2}>
							<Stack direction="column" spacing={2}>
								<Typography variant="h3">{project.name}</Typography>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h5">{'Level ' + member.level}</Typography>
									<Typography variant="h5">{member.xp + '/' + member.xpCap + ' XP'}</Typography>
								</Stack>
								<BorderLinearProgress variant="determinate" value={(member.xp / member.xpCap) * 100} />
								<Grid container justifyContent="space-between">
									<Grid item xs={6} md={6} mb={2}>
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
									</Grid>
									<Grid item xs={6} md={6} display="flex" justifyContent='flex-end'>
										<FilterControls
											idOrder={idOrder}
											priority={priority}
											status={status}
											setIdOrder={handleIdOrderChange}
											setPriority={handlePriorityChange}
											setStatus={handleStatusChange}
										/>
									</Grid>
								</Grid>
							</Stack>
						</Grid>
						<Grid item xs={12} lg={6}>
							<LeaderBoard members={project.members} />
						</Grid>
					</Grid>
				</Box>
				<Box bgcolor="bg.light" borderRadius="15px" mt={2} p={2}>
					<Typography variant="h3" mb={2}>
						Quests
					</Typography>
					<TaskGrid filters={{idOrder, priority, status}} members={project.members} tasks={project.tasks} />
				</Box>
			</Box>
		</>
	);
};

export default Tasks;
