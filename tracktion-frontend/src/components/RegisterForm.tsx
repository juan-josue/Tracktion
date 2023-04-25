import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Register form submitted!');
	};

	return (
		<>
			<Stack direction="column" spacing={1} mb={8} sx={{ width: '60%' }}>
				<Typography variant="h4">Create Your Tracktion Account!</Typography>
				<Typography variant="body1">
					Already got one?{' '}
					<Box component="span" color="yellow">
						{' Log in'}
					</Box>
				</Typography>
			</Stack>
			<form onSubmit={handleSubmit} style={{ width: '60%' }}>
				<Stack direction="column" spacing={3} mb={6}>
					<Stack direction="row" spacing={3}>
						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label="First Name"
							variant="filled"
							type="email"
							required
                            sx={{ flex: 1 }}
						>
							First Name
						</TextField>
						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label="Last Name"
							variant="filled"
							type="email"
							required
                            sx={{ flex: 1 }}
						>
							Last Name
						</TextField>
					</Stack>
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
					<Button
						variant="contained"
						type="submit"
						sx={{ width: '50%', bgcolor: 'secondary.dark' }}
					>
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

export default RegisterForm;
