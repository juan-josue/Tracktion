import { Grid, Box } from '@mui/material';
import LoginForm from './components/LoginForm';

const Login = () => {
	return (
		<>
			<Grid container height="100vh">
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
						<LoginForm />
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
							bgcolor: 'primary.dark',
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
