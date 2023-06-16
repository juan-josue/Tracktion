import { Box, Typography } from '@mui/material';

import { Project } from '../../types/types';

interface Props {
	color: string;
	project: Project;
	onClick?: (project: Project) => void;
}

const ProjectCard = ({ color, project, onClick }: Props) => {
	const handleClick = () => {
		if (onClick) {
			onClick(project);
		}
	};

	return (
		<Box
			borderRadius="15px"
			bgcolor={color}
			height='300px'
			width='300px'
			maxWidth="100%"
			flexShrink={0}
			p={2}
			onClick={handleClick}
		>
			<Typography sx={{ typography: { xs: 'h5', md: 'h3' } }} color="typography.main">
				{project.name}
			</Typography>
			<Typography sx={{ typography: { xs: 'body1', md: 'h5' } }} color="typography.main">
				{'Join Code: ' + project.joinCode}
			</Typography>
		</Box>
	);
};

export default ProjectCard;
