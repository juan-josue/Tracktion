import { Box, Drawer, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
	isDrawerOpen: boolean;
	setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
	return (
		<>
			<IconButton size="large" edge="start" color="inherit" onClick={() => setIsDrawerOpen(true)}>
				<MenuIcon></MenuIcon>
			</IconButton>
			<Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
				<Box p={2} width="100px" textAlign="center" role="presentation">
					<Typography variant="h6" component="div">
						Side Panel
					</Typography>
				</Box>
			</Drawer>
		</>
	);
};

export default SideBar;
