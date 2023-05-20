import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';

interface Props {
	userId: string;
}

const NewProjectForm = ({ userId }: Props) => {
	const navigate = useNavigate();
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [error, setError] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// Get access token from local storage
		const accessToken = localStorage.getItem('access_token');

		const data = {
			name: projectName,
			description: projectDescription,
		};

		apiClient
			.post('/projects', data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => refreshPage())
			.catch(async (err) => {
				// If the status is 401 (Unauthorized), try and refresh the access token
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						// If refreshing succeeded, update local storage and retry posting project
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.post('/projects', data, {
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
							})
							.then((res) => refreshPage())
							.catch((err) => setError(err.message));
					} else {
						// If refreshing the access token failed, navigate back to login
						navigate('/login');
					}
				} else {
					setError(err.message);
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
				<Button variant="contained" type="submit" color='secondary'>
					Create Project
				</Button>
			</Box>
		</form>
	);
};

export default NewProjectForm;
