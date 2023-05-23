import { Box, Chip, Stack, Typography } from '@mui/material';
import { Task } from '../../types/types';
import WhatshotIcon from '@mui/icons-material/Whatshot';

interface Props {
	task: Task;
}

const TaskCard = ({ task }: Props) => {
	return (
		<Box borderRadius="15px" bgcolor="#24202e" border="1px solid white">
			<Box bgcolor="primary.main" borderRadius="15px" display="inline-block" width="100%" height={0} pb="100%"></Box>
			<Stack direction="column" spacing={1} p={2}>
				<Typography variant="h5">{task.name}</Typography>
				<Stack direction="row" spacing={2}>
					<Chip size='small' icon={<WhatshotIcon />} label={task.priority} variant="outlined" />
					<Chip size='small' label={task.status} variant="outlined" />
					<Chip size='small' label={task.xpReward + " XP"} variant="filled" />
				</Stack>
			</Stack>
		</Box>
	);
};

export default TaskCard;
