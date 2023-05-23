import { Box, Button, Typography } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayCircle';
import { useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import { Project } from '../../types/types';

interface Props {
	selectedProject: Project | null;
}

const ProjectSelection = ({ selectedProject }: Props) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/tasks',  { state: { projectId: selectedProject?._id } });
	};

	if (!selectedProject) {
		return (
			<Typography variant="h5" color="typography.main" fontWeight="bold">
				Select, Join, Or Create An Odyssey!
			</Typography>
		);
	}

	return (
		<>
			<Typography variant="h4" color="typography.main">
				Current selection
			</Typography>
			<Box my={3} display="flex" justifyContent="center">
				<ProjectCard color="primary.light" project={selectedProject} />
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
				<Button variant="contained" color="secondary" size="large" onClick={handleClick} endIcon={<PlayIcon />}>
					Play Project
				</Button>
			</Box>
		</>
	);
};

export default ProjectSelection;
