import { Box, Button, Typography } from '@mui/material';
import refreshAccessToken from '../../services/refreshAccessToken';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/apiClient';
import { Task } from '../../types/types';

interface Props {
	task: Task;
}

const CompleteTaskModal = ({ task }: Props) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = () => {
		const accessToken = localStorage.getItem('access_token');

		apiClient
			.post(
				`/members/${task.taskTackler._id}/addxp`,
				{ xpReward: task.xpReward },
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			)
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.post(
								`/members/${task.taskTackler._id}/addxp`,
								{ xpReward: task.xpReward },
								{ headers: { Authorization: `Bearer ${accessToken}` } }
							)
							.then(() => refreshPage())
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});

		apiClient
			.put(`/tasks/${task._id}`, { status: 'Done' }, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.put(`/tasks/${task._id}`, { status: 'Done' }, { headers: { Authorization: `Bearer ${accessToken}` } })
							.then(() => refreshPage())
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});

		apiClient
			.post(
				`/members/${task.taskTackler._id}/addxp`,
				{ xpReward: task.xpReward },
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			)
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.post(
								`/members/${task.taskTackler._id}/addxp`,
								{ xpReward: task.xpReward },
								{ headers: { Authorization: `Bearer ${accessToken}` } }
							)
							.then(() => refreshPage())
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});
	};

	return (
		<>
			<Box textAlign="center">
				<Typography variant="h4" mb={2}>
					Victory is within reach! Complete this Quest?
				</Typography>
			</Box>
			<Button variant="contained" color="secondary" fullWidth size="large" onClick={handleSubmit}>
				Complete Quest
			</Button>
			{errorMessage && (
				<Typography variant="body1" color="error">
					{errorMessage}
				</Typography>
			)}
		</>
	);
};

export default CompleteTaskModal;
