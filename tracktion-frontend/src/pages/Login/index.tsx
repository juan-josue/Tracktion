import { Grid, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import image from '../../assets/anime.jpg';

const Login = () => {
	return (
		<>
			<Grid container height="100vh">
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						height: { xs: '70%', md: '100%' },
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						bgcolor: 'bg.dark',
					}}
				>
					<Stack direction="column" spacing={1} mb={8} sx={{ width: '60%' }}>
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
						<Link to="/register">{'Sign up'}</Link>
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					p={4}
					sx={{
						height: { xs: '30%', md: '100%' },
						paddingBottom: { xs: 0, md: 4 },
						bgcolor: 'bg.dark',
					}}
				>
					<Box
						sx={{
							bgcolor: 'bg.main',
							height: '100%',
							borderRadius: { xs: '15px 15px 0 0', md: '15px' },
							backgroundImage: `url(${image})`,
							backgroundSize: 'cover',
							backgroundPosition: { xs: 'top', md: 'center' },
						}}
					></Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
