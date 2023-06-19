import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Member, Project } from '../../types/types';
import refreshAccessToken from '../../services/refreshAccessToken';
import apiClient from '../../services/apiClient';

interface Props {
	project: Project;
	userId: string;
}

const LeaveProjectForm = ({ project, userId }: Props) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accessToken = localStorage.getItem('access_token');

		apiClient
			.delete(`/projects/${project._id}/user/${userId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(() => refreshPage())
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.delete(`/projects/${project._id}/user/${userId}`, { headers: { Authorization: `Bearer ${newAccessToken}` } })
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
		<Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
			<Typography pb={2} variant="h4">
				Every journey has it's twists and turns. Leave this adventure for now?
			</Typography>
			<form onSubmit={handleSubmit} style={{ width: '100%' }}>
				<Button variant="contained" type="submit" color="secondary" fullWidth>
					Leave Adventure
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

export default LeaveProjectForm;
