import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { Member, Task } from '../../types/types';
import Modal from '../../components/Modal';
import EditTaskForm from './EditTaskForm';
import CompleteTaskModal from './CompleteTaskModal';
import DeleteTaskForm from './DeleteTaskForm';

interface Props {
	members: Member[];
	task: Task;
}

const TaskCard = ({ members, task }: Props) => {
	function addZeroPadding(idNumber: number) {
		const idLength = 4;
		if (idNumber.toString().length >= idLength) return idNumber.toString();

		const paddingLength = idLength - idNumber.toString().length;
		const padding = '0'.repeat(paddingLength);

		return padding + idNumber.toString();
	}

	return (
		<Box borderRadius="15px" bgcolor="#24202e" border={task.status === 'Done' ? '3px solid #826b9e' : '3px solid white'}>
			<Box
				bgcolor="primary.main"
				borderRadius="15px"
				width="100%"
				height={0}
				pb="100%"
				position="relative"
				display="flex"
				justifyContent="center"
				alignItems="flex-end"
			>
				{/* <IconButton onClick={deleteTask} sx={{ position: 'absolute', top: 5, right: 5 }}>
					<CloseIcon fontSize="medium" />
				</IconButton> */}
				<Modal
					button={
						<IconButton sx={{ position: 'absolute', top: 5, right: 5 }}>
							<CloseIcon fontSize="medium" />
						</IconButton>
					}
					content={<DeleteTaskForm task={task}/>}
				/>
				{task.status !== 'Done' && (
					<>
						<Modal
							button={
								<IconButton sx={{ position: 'absolute', top: 45, right: 5 }}>
									<EditIcon fontSize="medium" />
								</IconButton>
							}
							content={<EditTaskForm members={members} task={task} />}
						/>
						<Modal
							button={
								<IconButton sx={{ position: 'absolute', top: 85, right: 5 }}>
									<TaskAltIcon fontSize="medium" />
								</IconButton>
							}
							content={<CompleteTaskModal task={task} />}
						/>
					</>
				)}
				{task.taskTackler && (
					<img width="40%" src={task.taskTackler.user.pfp} alt="Profile picture" style={{ position: 'absolute', bottom: 0 }} />
				)}
			</Box>
			<Stack direction="column" spacing={1} p={2}>
				<Box>
					<Typography variant="h5">{task.name}</Typography>
					<Typography variant="body1">{addZeroPadding(task.taskNumber)}</Typography>
				</Box>

				<Stack direction="row" spacing={2}>
					<Chip size="small" icon={<WhatshotIcon />} label={task.priority} variant="outlined" />
					<Chip size="small" label={task.status} variant="outlined" />
					<Chip size="small" label={task.xpReward + ' XP'} variant="filled" />
				</Stack>
			</Stack>
		</Box>
	);
};

export default TaskCard;
