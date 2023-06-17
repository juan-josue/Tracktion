import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Project } from '../../types/types';
import refreshAccessToken from '../../services/refreshAccessToken';
import apiClient from '../../services/apiClient';

interface Props {
	project: Project;
}

const DeleteProjectForm = ({ project }: Props) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accessToken = localStorage.getItem('access_token');

		apiClient
			.delete(`/projects/${project._id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.delete(`/projects/${project._id}`, { headers: { Authorization: `Bearer ${newAccessToken}` } })
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
		<Box display="flex" flexDirection="column" alignItems="center">
			<Typography pb={2} variant="h4">
				Remove this project forever? Forever is a long time!
			</Typography>
			<form onSubmit={handleSubmit} style={{ width: '100%' }}>
				<Button variant="contained" type="submit" color="secondary" fullWidth>
					Remove Project
				</Button>
			</form>

			{errorMessage && (
				<Typography variant="body1" color="error">
					{errorMessage}
				</Typography>
			)}
		</Box>
	);
};

export default DeleteProjectForm;
