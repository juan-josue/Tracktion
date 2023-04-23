import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

function App() {
	return (
		<Box height="100vh">
			<Grid container height="100%">
				<Grid item xs={12} md={6} sx={{ height: { xs: '70%', md: '100%' } }}>
					<Box
						sx={{
							bgcolor: 'primary.light',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Stack direction="column" spacing={1} mb={8} sx={{ width: '60%' }}>
							<Typography variant="h4">Hey, Welcome Back to Tracktion!</Typography>
							<Typography variant="body1">You can sign into your account here</Typography>
						</Stack>
						<Stack direction="column" spacing={3} mb={6} sx={{ width: '60%' }}>
							<TextField label="Email" variant="filled">
								Email
							</TextField>
							<TextField label="Password" variant="filled" type="password">
								Password
							</TextField>
							<Button variant="contained" type="submit" sx={{ width: '50%' }}>
								Sign In
							</Button>
						</Stack>
						<Typography variant="body1">
							Don't have an account?{' '}
							<Box component="span" color="purple">
								Sign up
							</Box>
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					p={4}
					sx={{ height: { xs: '30%', md: '100%' }, paddingBottom: { xs: 0, md: 4 } }}
				>
					<Box
						sx={{
							bgcolor: 'tomato',
							height: '100%',
							borderRadius: { xs: '15px 15px 0 0', md: '15px' },
						}}
					></Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default App;
