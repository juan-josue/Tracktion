import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';
import { Task } from '../../types/types';

interface Props {
    task: Task;
}

const EditTaskForm = ({ task }: Props) => {
	const navigate = useNavigate();
	const [name, setName] = useState(task.name);
	const [summary, setSummary] = useState(task.summary);
	const [priority, setPriority] = useState(task.priority);
	const [status, setStatus] = useState(task.status);
	const [xpReward, setXpReward] = useState(task.xpReward);
	const [errorMessage, setErrorMessage] = useState('');

	const statusChoices = ['To-do', 'Doing', 'Done'];
	const priorityChoices = ['None', 'Low', 'Medium', 'High'];

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accessToken = localStorage.getItem('access_token');

		const data = {
			name: name,
			xpReward: xpReward,
			summary: summary,
			status: status,
			priority: priority,
		};

		apiClient
			.put(`/tasks/${task._id}`, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.put(`/tasks/${task._id}`, data, {
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
							})
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
		<form onSubmit={handleSubmit}>
			<Stack direction="column" spacing={2}>
				<TextField
					color="secondary"
                    defaultValue={task.name}
					onChange={(e) => setName(e.target.value)}
					label="Task Name"
					type="text"
					fullWidth
					required
				></TextField>
				<Autocomplete
					options={statusChoices}
                    defaultValue={task.status}
					fullWidth
					onChange={(_e, value) => setStatus(value || 'To-do')}
					renderInput={(params) => <TextField {...params} color="secondary" label="Status" />}
				/>
				<Autocomplete
					options={priorityChoices}
                    defaultValue={task.priority}
					fullWidth
					onChange={(_e, value) => setPriority(value || 'None')}
					renderInput={(params) => <TextField {...params} color="secondary" label="Priority" />}
				/>
				<TextField
					color="secondary"
					defaultValue={task.xpReward}
					onChange={(e) => setXpReward(parseInt(e.target.value))}
					label="XP Reward"
					type="number"
					fullWidth
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
					required
				></TextField>
				<TextField
					color="secondary"
					defaultValue={task.summary}
					onChange={(e) => setSummary(e.target.value)}
					multiline
					maxRows={10}
					label="Summary"
					type="text"
					fullWidth
				></TextField>
				<Button variant="contained" type="submit" color="secondary">
					Update Quest
				</Button>
			</Stack>

			{errorMessage && (
				<Typography variant="body1" color="error">
					{errorMessage}
				</Typography>
			)}
		</form>
	);
};

export default EditTaskForm;
