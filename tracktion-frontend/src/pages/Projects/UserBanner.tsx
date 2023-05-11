import { Box, Typography } from '@mui/material';

interface User {
	_id: string;
	name: string;
	projects: string[];
}

interface Props {
	user: User | null;
}

const UserBanner = ({ user }: Props) => {
	const welcomeMessage = user ? (
		<Typography display='flex' justifyContent='center' alignItems='center' height='100%' variant="h3" fontWeight="bold" color="typography.main">
			Welcome back {user.name}
		</Typography>
	) : null;

	return (
		<Box height="100%" width="100%" p={2} borderRadius="15px" bgcolor="secondary.main">
			{welcomeMessage}
		</Box>
	);
};

export default UserBanner;
