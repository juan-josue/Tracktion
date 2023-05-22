import { Box, Button, Grid, LinearProgress, Stack, Typography, linearProgressClasses, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 20,
	borderRadius: 10,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.accent.dark,
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
	},
}));

const Tasks = () => {
	const location = useLocation();
	const projectId = location.state?.projectId;
	return (
		<>
			<Box minHeight="100vh" bgcolor="bg.main" p={2} boxSizing="border-box">
				<Box bgcolor="bg.light" borderRadius="15px">
					<Grid container>
						<Grid item xs={12} md={6} p={2}>
							<Stack direction="column" spacing={2}>
								<Typography variant="h3">{projectId}</Typography>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h5">Level 7</Typography>
									<Typography variant="h5">14/20 XP</Typography>
								</Stack>
								<BorderLinearProgress variant="determinate" value={70} />
								<Button variant="contained" color="secondary" sx={{ maxWidth: 150 }} endIcon={<AddIcon />}>
									New Task
								</Button>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}></Grid>
					</Grid>
				</Box>
				<Box bgcolor="bg.light" borderRadius="15px" mt={2} p={2}>
					<Typography variant="h3">{projectId}'s Tasks</Typography>
                    <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                    </ul>
				</Box>
			</Box>
		</>
	);
};

export default Tasks;
