import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/api/auth', {
				email,
				password,
			});
			console.log(response.data);
			setErrorMessage('');
		} catch (error) {
			const err = error as AxiosError;
			console.error(err.message);
			setErrorMessage('Invalid username or password.');
		}
	};

	return (
		<>
			<Stack direction="column" spacing={1} mb={8} sx={{ width: '60%' }}>
				<Typography variant="h4">Hey, Welcome Back to Tracktion!</Typography>
				<Typography variant="body1">You can sign into your account here</Typography>
			</Stack>
			<form onSubmit={handleSubmit} style={{ width: '60%' }}>
				<Stack direction="column" spacing={3} mb={6}>
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						variant="filled"
						type="email"
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
						required
					>
						Password
					</TextField>
					<Button variant="contained" type="submit" sx={{ width: '50%' }}>
						Sign In
					</Button>
					{errorMessage && (
						<Typography variant="body1" color="error">
							{errorMessage}
						</Typography>
					)}
				</Stack>
			</form>
			<Typography variant="body1">
				Don't have an account?
				<Box component="span" color="purple">
					Sign up
				</Box>
			</Typography>
		</>
	);
};

export default LoginForm;
