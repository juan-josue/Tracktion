import { Box, Typography } from '@mui/material';

const ProjectBox = () => {
	return (
		<Box
			borderRadius={'15px'}
			bgcolor="secondary.main"
			height={{ xs: 150, md: 340 }}
			width={{ xs: 150, md: 340 }}
            maxWidth='100%'
			flexShrink={0}
            p={2}
		>
            <Typography sx={{ typography: { xs: 'h5', md: 'h3' } }} color='typography.dark'>Tracktion</Typography>
        </Box>
	);
};

export default ProjectBox;
