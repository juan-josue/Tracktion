import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';
import { Project } from '../../types/types';

interface Props {
    project: Project;
}

const EditProjectForm = ({ project }: Props) => {
	const navigate = useNavigate();
	const [projectName, setProjectName] = useState(project.name);
	const [projectDescription, setProjectDescription] = useState(project.description);
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
			.put(`/projects/${project._id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.put(`/projects/${project._id}`, data, { headers: { Authorization: `Bearer ${newAccessToken}` } })
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
					value={projectName}
					onChange={(e) => setProjectName(e.target.value)}
					label="Adventure Name"
					type="text"
					fullWidth
					minRows={5}
					variant="filled"
					required
				></TextField>
				<TextField
                    value={projectDescription}
					onChange={(e) => setProjectDescription(e.target.value)}
					label="Description"
					type="text"
					multiline
					fullWidth
					minRows={5}
					variant="filled"
				></TextField>
				<Button variant="contained" type="submit" color="secondary">
					Update Project
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

export default EditProjectForm;
