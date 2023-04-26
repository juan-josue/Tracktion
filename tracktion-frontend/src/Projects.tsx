import { Box, Grid, Typography } from '@mui/material';
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
						<Typography variant="h5" mb={2}>
							All your projects
						</Typography>
						<Box display={'flex'} overflow={'scroll'} sx={{overflowY: 'hidden'}}>
							<Box borderRadius={'15px'} bgcolor="slateblue" ml={3} mr={3} height={175} width={175} flexShrink={0}/>
							<Box borderRadius={'15px'} bgcolor="slateblue" ml={3} mr={3} height={175} width={175} flexShrink={0}/>
							<Box borderRadius={'15px'} bgcolor="slateblue" ml={3} mr={3} height={175} width={175} flexShrink={0}/>
							<Box borderRadius={'15px'} bgcolor="slateblue" ml={3} mr={3} height={175} width={175} flexShrink={0}/>
							<Box borderRadius={'15px'} bgcolor="slateblue" ml={3} mr={3} height={175} width={175} flexShrink={0}/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
