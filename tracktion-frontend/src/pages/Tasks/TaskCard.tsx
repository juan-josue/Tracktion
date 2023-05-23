import { Box, Paper, Stack, Typography } from '@mui/material';
import { Task } from '../../types/types';

interface Props {
	task: Task;
}

const TaskCard = ({ task }: Props) => {
	return (
		<Paper elevation={6} sx={{ p: 2, borderRadius: '15px' }}>
			<Stack direction="column" spacing={2}>
				<Box height={250} bgcolor="primary.main" borderRadius='15px'></Box>
				<Typography variant="h5" bgcolor="primary.main">
					{task.name}
				</Typography>
			</Stack>
		</Paper>
	);
};

export default TaskCard;
