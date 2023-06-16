import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';

const NewProjectForm = () => {
	const navigate = useNavigate();
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accessToken = localStorage.getItem('access_token');

		const data = {
			name: projectName,
			description: projectDescription,
		};

		apiClient
			.post('/projects', data, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.post('/projects', data, { headers: { Authorization: `Bearer ${newAccessToken}` } })
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
			<Box display={'flex'} flexDirection="column" gap={3}>
				<TextField
					placeholder="Give the new project a name..."
					onChange={(e) => setProjectName(e.target.value)}
					label="Project Name"
					type="text"
					fullWidth
					minRows={5}
					variant="filled"
					required
				></TextField>
				<TextField
					placeholder="Tell us what this project is about..."
					onChange={(e) => setProjectDescription(e.target.value)}
					label="Description"
					type="text"
					multiline
					fullWidth
					minRows={5}
					variant="filled"
				></TextField>
				<Button variant="contained" type="submit" color="secondary">
					Create Project
				</Button>
				{errorMessage && (
					<Typography variant="body1" color="error">
						{errorMessage}
					</Typography>
				)}
			</Box>
		</form>
	);
};

export default NewProjectForm;
