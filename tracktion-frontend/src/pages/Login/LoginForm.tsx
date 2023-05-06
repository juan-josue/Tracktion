import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, Stack, TextField, Typography } from '@mui/material';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/api/auth/login', {
				email,
				password,
			});
			const tokens = response?.data;
			localStorage.setItem('access_token', tokens.accessToken);
			localStorage.setItem('refresh_token', tokens.refreshToken);
			console.log(tokens);
			setErrorMessage('');
		} catch (error) {
			const err = error as AxiosError;
			if (!err.response) {
				setErrorMessage('No server response.');
			} else {
				setErrorMessage('Invalid username or password.');
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} style={{ width: '60%' }}>
				<Stack direction="column" spacing={3} mb={6}>
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						variant="filled"
						type="email"
						sx={{
							bgcolor: 'bg.light',
							borderRadius: '5px 5px 0 0',
							input: { color: 'typography.main' },
							label: { color: 'typography.main' },
						}}
						required
					>
						Email
					</TextField>
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label="Password"
						variant="filled"
						type="password"
						sx={{
							bgcolor: 'bg.light',
							borderRadius: '5px 5px 0 0',
							input: { color: 'typography.main' },
							label: { color: 'typography.main' },
						}}
						required
					>
						Password
					</TextField>
					<Button variant="contained" type="submit" sx={{ boxShadow: "0px 0px 30px 0px #afeb7f", width: '50%' }}>
						Sign In
					</Button>
					
					{errorMessage && (
						<Typography variant="body1" color="error">
							{errorMessage}
						</Typography>
					)}
				</Stack>
			</form>
		</>
	);
};

export default LoginForm;