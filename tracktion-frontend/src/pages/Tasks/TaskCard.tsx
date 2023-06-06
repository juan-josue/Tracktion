import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Task } from '../../types/types';
import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';
import Modal from '../../components/Modal';
import EditTaskForm from './EditTaskForm';

interface Props {
	task: Task;
}

const TaskCard = ({ task }: Props) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	function addZeroPadding(idNumber: number) {
		const idLength = 4;
		if (idNumber.toString().length >= idLength) return idNumber.toString();

		const paddingLength = idLength - idNumber.toString().length;
		const padding = '0'.repeat(paddingLength);

		return padding + idNumber.toString();
	}

	const deleteTask = () => {
		if (!confirm('Are you sure you want to delete this Quest?')) {
			return;
		}

		const accessToken = localStorage.getItem('access_token');

		apiClient
			.delete(`/tasks/${task._id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.delete(`/tasks/${task._id}`, { headers: { Authorization: `Bearer ${newAccessToken}` } })
							.then(() => refreshPage())
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/projects');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});
	};

	return (
		<Box borderRadius="15px" bgcolor="#24202e" border="1px solid white">
			<Box
				bgcolor="primary.main"
				borderRadius="15px"
				width="100%"
				height={0}
				pb="100%"
				position="relative"
				display="flex"
				justifyContent="center"
				alignItems="flex-end"
			>
				<IconButton onClick={deleteTask} sx={{ position: 'absolute', top: 5, right: 5 }}>
					<CloseIcon fontSize="medium" />
				</IconButton>
				<Modal
					button={
						<IconButton sx={{ position: 'absolute', top: 45, right: 5 }}>
							<EditIcon fontSize="medium" />
						</IconButton>
					}
					content={<EditTaskForm task={task} />}
				/>
				<img width="40%" src={task.taskTackler.user.pfp} alt="Profile picture" style={{ position: 'absolute', bottom: 0 }} />
			</Box>
			<Stack direction="column" spacing={1} p={2}>
				{errorMessage && (
					<Typography variant="body1" color="error">
						{errorMessage}
					</Typography>
				)}
				<Box>
					<Typography variant="h5">{task.name}</Typography>
					<Typography variant="body1">{addZeroPadding(task.taskNumber)}</Typography>
				</Box>

				<Stack direction="row" spacing={2}>
					<Chip size="small" icon={<WhatshotIcon />} label={task.priority} variant="outlined" />
					<Chip size="small" label={task.status} variant="outlined" />
					<Chip size="small" label={task.xpReward + ' XP'} variant="filled" />
				</Stack>
			</Stack>
		</Box>
	);
};

export default TaskCard;
