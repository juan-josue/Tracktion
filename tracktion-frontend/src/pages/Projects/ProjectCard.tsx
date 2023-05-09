import { Box, Typography } from '@mui/material';

interface Project {
	_id: string;
	description: string;
	joinCode: string;
	name: string;
	owner: string;
}

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
	return (
		<Box
			borderRadius="15px"
			bgcolor="secondary.main"
			height={{ xs: 150, md: 340 }}
			width={{ xs: 150, md: 340 }}
			maxWidth="100%"
			flexShrink={0}
			p={2}
		>
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
