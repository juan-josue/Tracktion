import { Grid, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

const Login = () => {
	return (
		<>
			<Grid container height="100vh">
				<Grid
					item
					xs={12}
					md={6}
					height={{ xs: '70%', md: '100%' }}
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					bgcolor="bg.main"
				>
					<Stack direction="column" spacing={1} mb={8} width="60%">
						<Typography variant="h4" color="typography.main">
							Hey, Welcome Back to Tracktion!
						</Typography>
						<Typography variant="body1" color="typography.light">
							You can sign into your account here
						</Typography>
					</Stack>
					<LoginForm />
					<Typography variant="body1" color="typography.main">
						{"Don't have an account? "}
						<Typography
							component={Link}
							to="/register"
							sx={{
								textDecoration: 'none',
								color: 'primary.main',
								'&:visited': {
									color: 'primary.main',
								},
							}}
						>
							Sign up
						</Typography>
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} p={4} height={{ xs: '30%', md: '100%' }} bgcolor="bg.main" pb={{ xs: 0, md: 4 }}>
					<Box
						sx={{
							bgcolor: 'primary.main',
							height: '100%',
							borderRadius: { xs: '15px 15px 0 0', md: '15px' },
						}}
					></Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
