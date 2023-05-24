import { Task } from '../../types/types';
import { Grid } from '@mui/material';
import TaskCard from './TaskCard';

interface Props {
	tasks: Task[];
}

const TaskGrid = ({ tasks }: Props) => {
	return (
		<Grid container spacing={2}>
			{tasks.map((task: Task) => (
				<Grid key={task._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
					<TaskCard task={task} />
				</Grid>
			))}
		</Grid>
	);
};

export default TaskGrid;
