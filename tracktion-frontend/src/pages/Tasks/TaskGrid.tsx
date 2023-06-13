import { Member, Task } from '../../types/types';
import { Grid } from '@mui/material';
import TaskCard from './TaskCard';

interface Props {
	members: Member[];
	tasks: Task[];
	filters: {
		idOrder: string;
		priority: string;
		status: string;
	};
}

const TaskGrid = ({ members, tasks, filters }: Props) => {
	let filteredTasks = [...tasks];

	if (filters.idOrder === 'Ascending') {
		filteredTasks.sort((a, b) => a.taskNumber - b.taskNumber);
	} else {
		filteredTasks.sort((a, b) => b.taskNumber - a.taskNumber);
	}

	if (filters.priority !== '') {
		filteredTasks = filteredTasks.filter((task) => task.priority === filters.priority);
	}

	if (filters.status !== '') {
		filteredTasks = filteredTasks.filter((task) => task.status === filters.status);
	}

	return (
		<Grid container spacing={2}>
			{filteredTasks.map((task: Task) => (
				<Grid key={task._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
					<TaskCard members={members} task={task} />
				</Grid>
			))}
		</Grid>
	);
};

export default TaskGrid;
