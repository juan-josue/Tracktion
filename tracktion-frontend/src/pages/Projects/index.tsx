import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Project } from '../../types/types';
import UserBanner from './UserBanner';
import ProjectList from './ProjectList';
import ProjectSelection from './ProjectSelection';
import NewProjectForm from './NewProjectForm';
import JoinProjectForm from './JoinProjectForm';
import Modal from '../../components/Modal';
import useUser from '../../hooks/useUser';
import Navbar from '../../components/Navbar';
import './animatedBackground.css';

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const navigate = useNavigate();

	const { user } = useUser();

	const handleProjectCardClick = (project: Project) => {
		setSelectedProject(project);
	};

	if (!user) {
		navigate('/login');
		return null;
	}

	return (
		<Grid
			container
			minHeight="100vh"
			bgcolor="bg.main"
			p={2}
			boxSizing="border-box"
			rowGap={2}
			direction="column"
			justifyContent="start"
		>
			<Grid item xs={12}>
				<Navbar />
			</Grid>
			<Grid container item xs={12} style={{ flexGrow: 1 }}>
				{/* project list, user banner, join and create controls */}
				<Grid container height="auto" item xs={12} md={8} lg={9} order={{ xs: 3, md: 2 }}>
					{/* user banner */}
					<Grid item xs={12} md={6} height="auto">
						<Box
							bgcolor="primary.light"
							className="background"
							p={2}
							borderRadius="15px"
							height={{ xs: 'auto', md: '100%' }}
							mr={{ xs: 0, md: 2 }}
						>
							<UserBanner user={user} />
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</Box>
					</Grid>
					{/* join and create controls */}
					<Grid container item xs={12} md={6} height="auto" mt={{ xs: 2, md: 0 }} gap={2}>
						{/* create project control */}
						<Grid item xs={12} height="auto">
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
								bgcolor="bg.light"
								p={2}
								borderRadius="15px"
								height="100%"
							>
								<Typography variant="h5" color="typography.main" fontWeight="bold">
									Begin A New Adventure
								</Typography>
								<Modal
									button={
										<Button variant="contained" color="secondary" fullWidth endIcon={<AddBoxIcon />}>
											Create A New Adventure
										</Button>
									}
									content={<NewProjectForm />}
								/>
							</Box>
						</Grid>
						{/* join project control */}
						<Grid item xs={12} height="auto">
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
								bgcolor="bg.light"
								p={2}
								borderRadius="15px"
								height="100%"
							>
								<Typography variant="h5" color="typography.main" fontWeight="bold">
									Join An Adventure With A Code
								</Typography>
								<JoinProjectForm userId={user._id} />
							</Box>
						</Grid>
					</Grid>
					<Grid item xs={12} height="auto" mt={2}>
						<Box
							display={'flex'}
							alignItems="center"
							bgcolor="bg.light"
							p={2}
							borderRadius="15px"
							height={{ xs: 'auto', md: '100%' }}
						>
							<ProjectList projectIds={user.projects} onProjectCardClick={handleProjectCardClick} />
						</Box>
					</Grid>
				</Grid>
				<Grid item xs={12} md={4} lg={3} height="auto" order={{ xs: 2, md: 3 }} mb={{ xs: 2, md: 0 }}>
					<Box bgcolor="bg.light" height="100%" p={2} borderRadius="15px" ml={{ xs: 0, md: 2 }}>
						<ProjectSelection userId={user._id} selectedProject={selectedProject ? selectedProject : null} />
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Projects;
