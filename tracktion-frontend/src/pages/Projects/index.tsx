import { Box, Grid, Typography } from '@mui/material';
import SideBar from '../../components/SideBar';
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
					<Grid item xs={12} lg={6} height={{ xs: '35%', lg: '60%' }} bgcolor={'primary.light'}>
						<Typography variant="h5">Current Project Selection</Typography>
						<Box
							borderRadius={'15px'}
							bgcolor="primary.dark"
							ml={3}
							mr={3}
							height={{ xs: '250px', lg: '400px' }}
							width={{ xs: '250px', lg: '400px' }}
							flexShrink={0}
						/>
					</Grid>
					<Grid container item xs={12} lg={6} height={{ xs: '35%', lg: '60%' }} bgcolor={'thistle'}>
						<Grid item xs={12} bgcolor={'primary.dark'}>
							<Typography variant="h5">Join a project</Typography>
						</Grid>
						<Grid item xs={12} bgcolor={'slateblue'}>
							<Typography variant="h5">Create a project</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} height={{ xs: '30%', md: '40%' }} bgcolor={'primary'}>
						<Typography variant="h5" mb={2}>
							All your projects
						</Typography>
						<Box display={'flex'} overflow={'scroll'} sx={{ overflowY: 'hidden' }}>
							<Box
								borderRadius={'15px'}
								bgcolor="primary.dark"
								ml={3}
								mr={3}
								height={175}
								width={175}
								flexShrink={0}
							/>
							<Box
								borderRadius={'15px'}
								bgcolor="primary.dark"
								ml={3}
								mr={3}
								height={175}
								width={175}
								flexShrink={0}
							/>
							<Box
								borderRadius={'15px'}
								bgcolor="primary.dark"
								ml={3}
								mr={3}
								height={175}
								width={175}
								flexShrink={0}
							/>
							<Box
								borderRadius={'15px'}
								bgcolor="primary.dark"
								ml={3}
								mr={3}
								height={175}
								width={175}
								flexShrink={0}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Projects;
