import { TextField, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/apiClient';
import refreshAccessToken from '../../services/refreshAccessToken';

interface Props {
	userId: string;
}

const JoinProjectForm = ({ userId }: Props) => {
	const navigate = useNavigate();
	const [joinCode, setJoinCode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function refreshPage() {
		window.location.reload();
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accessToken = localStorage.getItem('access_token');

		const data = {
			user: userId,
			joinCode: joinCode,
		};

		apiClient
			.post('/members', data, {
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
							.post('/members', data, {
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
							})
							.then(() => refreshPage())
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						// If refreshing the access token failed, navigate back to login
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
					value={joinCode}
					onChange={(e) => setJoinCode(e.target.value)}
					label="Join Code"
					placeholder="XXXX-XXXX"
					variant="outlined"
					color="secondary"
					size="medium"
					required
				/>
				<Button variant="contained" type="submit" color="secondary" size="medium">
					Join
				</Button>
				{errorMessage && (
					<Typography variant="body1" color="error">
						{errorMessage}
					</Typography>
				)}
			</Stack>
		</form>
	);
};

export default JoinProjectForm;
