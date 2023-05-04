import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

const RegisterForm = () => {
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Register form submitted!');
	};

	return (
		<form onSubmit={handleSubmit} style={{ width: '60%' }}>
			<Stack direction="column" spacing={3} mb={6}>
				<Stack direction="row" spacing={3}>
					<TextField
						value={first}
						onChange={(e) => setFirst(e.target.value)}
						label="First Name"
						variant="filled"
						type="standard"
						required
						sx={{
							flex: 1,
							bgcolor: 'bg.light',
							borderRadius: '5px 5px 0 0',
							input: { color: 'typography.main' },
							label: { color: 'typography.main' },
						}}
					>
						First Name
					</TextField>
					<TextField
						value={last}
						onChange={(e) => setLast(e.target.value)}
						label="Last Name"
						variant="filled"
						type="standard"
						required
						sx={{
							flex: 1,
							bgcolor: 'bg.light',
							borderRadius: '5px 5px 0 0',
							input: { color: 'typography.main' },
							label: { color: 'typography.main' },
						}}
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
					sx={{
						bgcolor: 'bg.light',
						borderRadius: '5px 5px 0 0',
						input: { color: 'typography.main' },
						label: { color: 'typography.main' },
					}}
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
					sx={{
						bgcolor: 'bg.light',
						borderRadius: '5px 5px 0 0',
						input: { color: 'typography.main' },
						label: { color: 'typography.main' },
					}}
				>
					Password
				</TextField>
				<Button variant="contained" type="submit" sx={{ boxShadow: "0px 0px 30px 0px #afeb7f", width: '50%' }}>
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
