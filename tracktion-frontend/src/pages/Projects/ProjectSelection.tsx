import { Box, Button, Stack, Typography } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import { Project } from '../../types/types';

interface Props {
	selectedProject: Project | null;
	userId: string;
}

const ProjectSelection = ({ selectedProject, userId }: Props) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/tasks', { state: { projectId: selectedProject?._id, userId: userId } });
	};

	if (!selectedProject) {
		return (
			<Typography variant="h5" color="typography.main" fontWeight="bold">
				Select, Join, Or Create An Odyssey!
			</Typography>
		);
	}

	console.log(selectedProject);

	return (
		<>
			<Typography variant="h5" color="typography.main" mb={2}>
				Current Selection
			</Typography>
			<Box mb={2} display="flex" justifyContent="center">
				<ProjectCard color="primary.light" project={selectedProject} />
			</Box>

			<Stack direction="row" mb={2} spacing={2} justifyContent="center">
				<Button variant="contained" color="secondary" onClick={handleClick} endIcon={<PlayIcon />}>
					Play
				</Button>
				{userId === selectedProject.owner && (
					<Stack direction="row" mb={2} spacing={2} justifyContent="center">
						<Button variant="contained" color="secondary" onClick={handleClick} endIcon={<ModeEditIcon />}>
							Edit
						</Button>
						<Button variant="contained" color="secondary" onClick={handleClick} endIcon={<ClearIcon />}>
							Delete
						</Button>
					</Stack>
				)}
			</Stack>

			<Stack spacing={2} display={{ xs: 'none', md: 'block' }}>
				<Typography variant="h5" color="typography.main">
					Description
				</Typography>
				<Typography variant="body1" color="typography.main">
					{selectedProject.description}
				</Typography>
			</Stack>
		</>
	);
};

export default ProjectSelection;
