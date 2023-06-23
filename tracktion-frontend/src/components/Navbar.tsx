import { Chip, IconButton, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logos/t.svg';
import logout from '../services/logout';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<Stack px={2} bgcolor="bg.main" direction="row" justifyContent="space-between" alignItems="center" borderRadius="15px">
			<Stack direction="row" spacing={2} alignItems="center">
				<img src={logo} alt="Tracktion Logo" height="25px"></img>
				<Chip color="primary" icon={<DashboardIcon />} onClick={() => navigate('/projects')} label="Adventures" />
			</Stack>
			<IconButton
				aria-label="Logout"
				onClick={() => {
					logout();
					navigate('/login');
				}}
			>
				<LogoutIcon />
			</IconButton>
		</Stack>
	);
};

export default Navbar;
