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
		<Typography variant="h4" color="typography.main">
			Welcome, {user.name}!
		</Typography>
	) : null;

	return (
		<Box height="100%" width="100%" p={2} borderRadius="15px" bgcolor="secondary.main">
			{welcomeMessage}
		</Box>
	);
};

export default UserBanner;
