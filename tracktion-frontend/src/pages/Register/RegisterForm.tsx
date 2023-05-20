import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const RegisterForm = () => {
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {
			name: first + ' ' + last,
			email: email,
			password: password,
		};
		apiClient
			.post('/users', data)
			.then(async () => {
				setErrorMessage('');
				try {
					const response = await apiClient.post('/auth/login', {
						email,
						password,
					});
					const tokens = response?.data;
					localStorage.setItem('access_token', tokens.accessToken);
					localStorage.setItem('refresh_token', tokens.refreshToken);
					navigate('/projects');
				} catch (error) {
					const err = error as AxiosError;
					if (!err.response) {
						setErrorMessage('No server response.');
					} else {
						setErrorMessage('Invalid username or password.');
					}
				}
			})
			.catch((err) => {
				setErrorMessage(err.response.data);
			});
	};

	return (
		<form onSubmit={handleSubmit} style={{ width: '60%' }}>
			<Stack direction="column" spacing={3} mb={6}>
				<Stack direction="row" spacing={3}>
					<TextField
						value={first}
						onChange={(e) => setFirst(e.target.value)}
						label="First Name"
						variant="outlined"
						type="standard"
						sx={{ width: '50%' }}
						required
					>
						First Name
					</TextField>
					<TextField
						value={last}
						onChange={(e) => setLast(e.target.value)}
						label="Last Name"
						variant="outlined"
						type="standard"
						sx={{ width: '50%' }}
						required
					>
						Last Name
					</TextField>
				</Stack>
				<TextField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
					variant="outlined"
					type="email"
					required
				>
					Email
				</TextField>
				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label="Password"
					variant="outlined"
					type="password"
					required
				>
					Password
				</TextField>
				<Button variant="contained" type="submit" sx={{ width: '50%' }}>
					Create Account
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

export default RegisterForm;
