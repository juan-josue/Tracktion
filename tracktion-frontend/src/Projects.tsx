import { Box, Grid, List, Stack, Typography } from '@mui/material';
import SideBar from './components/SideBar';
import { useState } from 'react';

const Projects = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<Grid container height="100vh" width="100%">
				<Grid item xs={12} bgcolor={'primary.dark'} height={'50px'}>
					<SideBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
				</Grid>
				<Grid container item xs={12} bgcolor={'primary.light'} height={'calc(100% - 50px)'}>
					<Grid item xs={12} md={6} height={{ xs: '35%', md: '60%' }} bgcolor={'goldenrod'}>
						<Typography variant="h5">Current Project Selection</Typography>
					</Grid>
					<Grid container item xs={12} md={6} height={{ xs: '35%', md: '60%' }} bgcolor={'thistle'}>
						<Grid item xs={12} bgcolor={'tan'}>
							<Typography variant="h5">Join a project</Typography>
						</Grid>
						<Grid item xs={12} bgcolor={'lightcoral'}>
							<Typography variant="h5">Create a project</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} height={{ xs: '30%', md: '40%' }} bgcolor={'tomato'}>
						<Typography variant="h5" mb={2}>All your projects</Typography>
                        <List>
                            <Box bgcolor={'slateblue'} height={'150px'} width={'150px'}></Box>
                            <Box bgcolor={'slateblue'} height={'150px'} width={'150px'}></Box>
                            <Box bgcolor={'slateblue'} height={'150px'} width={'150px'}></Box>
                            <Box bgcolor={'slateblue'} height={'150px'} width={'150px'}></Box>
                        </List>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
