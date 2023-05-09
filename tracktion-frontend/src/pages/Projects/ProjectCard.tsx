import { Box, Typography } from '@mui/material';

import { Project } from '../../types/types';

interface Props {
	project: Project;
	onClick?: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: Props) => {
	const handleClick = () => {
		if (onClick) {
			onClick(project);
		}
	};

	return (
		<Box borderRadius="15px" bgcolor="secondary.main" height={{ xs: 150, md: 340 }} width={{ xs: 150, md: 340 }} maxWidth="100%" flexShrink={0} p={2} onClick={handleClick}>
			<Typography sx={{ typography: { xs: 'h5', md: 'h3' } }} color="typography.dark">
				{project.name}
			</Typography>
			<Typography sx={{ typography: { xs: 'body1', md: 'h5' } }} color="typography.lighter">
				{'Join Code: ' + project.joinCode}
			</Typography>
		</Box>
	);
};

export default ProjectCard;
