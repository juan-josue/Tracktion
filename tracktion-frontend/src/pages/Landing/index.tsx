import { Grid, Typography, Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import image from '../../assets/landing.svg';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<Grid container height="100vh" bgcolor="bg.main" alignItems="flex-end" gap={2} sx={{ overflowY: 'hidden' }}>
			<Grid item xs={12} px={2}>
				<Stack spacing={2} alignItems="center">
					<Typography variant="h3" fontWeight="bold" textAlign="center">
						<Typography variant="inherit" sx={{ display: 'inline' }} color="accent.main">
							{'LevelUp() '}
						</Typography>
						<Typography
							variant="inherit"
							sx={{
								display: { xs: 'none', lg: 'inline' },
							}}
						>
							{'your project management game '}
						</Typography>
						<Typography variant="inherit" sx={{ display: 'inline' }}>
							{'with '}
						</Typography>
						<Typography variant="inherit" color="primary.light" noWrap sx={{ display: 'inline' }}>
							{'<Tracktion />'}
						</Typography>
					</Typography>
					<Typography variant="body1" width="70%" textAlign="center">
						The gamified project management software that makes work feel like play.
					</Typography>
					<Button onClick={() => navigate('/login')} sx={{ maxWidth: '300px' }} variant="contained" color="primary">
						Start using Tracktion
					</Button>
				</Stack>
			</Grid>
			<Grid item xs={12} height="50%" display="flex" justifyContent="center" position="relative">
				<Box
					position="relative"
					width={{xs: '1000px', md: '100%'}}
					sx={{
						backgroundImage: `linear-gradient(to bottom, transparent, #0E0D12), url(${image})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'top',
					}}
				></Box>
			</Grid>
		</Grid>
	);
};

export default Landing;
