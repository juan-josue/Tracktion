import { Chip, IconButton, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logos/t.svg'

const Navbar = () => {
	return (
		<Stack px={2} bgcolor='bg.main' direction="row" justifyContent='space-between' alignItems="center" borderRadius="15px">
			<Stack direction='row' spacing={2} alignItems="center">
				<img src={logo} alt='Tracktion Logo' height='25px'></img>
        <Chip color="primary" icon={<DashboardIcon />} label="Projects" />
				<IconButton aria-label="Profile">
					<PersonIcon />
				</IconButton>
			</Stack>
			<IconButton aria-label="Logout">
				<LogoutIcon />
			</IconButton>
		</Stack>
	);
};

export default Navbar;
