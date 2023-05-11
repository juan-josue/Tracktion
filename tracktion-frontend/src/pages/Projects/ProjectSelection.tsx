import { Box, Button, Typography } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayCircle';

import ProjectCard from './ProjectCard';
import { Project } from '../../types/types';

interface Props {
	selectedProject: Project | null;
}

const ProjectSelection = ({ selectedProject }: Props) => {
	if (!selectedProject) {
		return (
			<Typography variant="h4" color="typography.main">
				Select a project or create a new one
			</Typography>
		);
	}

	return (
		<>
			<Typography variant="h4" color="typography.main">
				Current selection
			</Typography>
			<Box my={3} display="flex" justifyContent="center">
				<ProjectCard project={selectedProject}/>
			</Box>
			<Box display={{ xs: 'none', md: 'block' }}>
				<Typography variant="h4" color="typography.main">
					Project description
				</Typography>
				<Typography variant="body1" color="typography.main">
					{selectedProject.description}
				</Typography>
			</Box>
			<Box display="flex" justifyContent={{ xs: 'center', md: 'left' }} mt={2}>
				<Button variant="contained" color="secondary" size="large" endIcon={<PlayIcon />}>
					Play Project
				</Button>
			</Box>
		</>
	);
};

export default ProjectSelection;
