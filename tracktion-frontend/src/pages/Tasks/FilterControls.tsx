import { Stack, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
	idOrder: string;
	setIdOrder: (newIdOrder: string) => void;
	priority: string;
	setPriority: (newPriority: string) => void;
	status: string;
	setStatus: (newStatus: string) => void;
}

const FilterControls = ({ idOrder, priority, status, setIdOrder, setPriority, setStatus }: Props) => {
	return (
		<Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
			<FormControl sx={{ minWidth: 140 }} size="small">
				<InputLabel>ID</InputLabel>
				<Select autoWidth value={idOrder} label="Age" onChange={(e) => setIdOrder(e.target.value)}>
					<MenuItem value={'Ascending'}>Ascending</MenuItem>
					<MenuItem value={'Descending'}>Descending</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ minWidth: 120 }} size="small">
				<InputLabel>Priority</InputLabel>
				<Select autoWidth value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
					<MenuItem value={''}>None</MenuItem>
					<MenuItem value={'Low'}>Low</MenuItem>
					<MenuItem value={'Medium'}>Medium</MenuItem>
					<MenuItem value={'High'}>High</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ minWidth: 100 }} size="small">
				<InputLabel>Status</InputLabel>
				<Select autoWidth value={status} label="Age" onChange={(e) => setStatus(e.target.value)}>
					<MenuItem value="">None</MenuItem>
					<MenuItem value={'To-do'}>To-do</MenuItem>
					<MenuItem value={'Doing'}>Doing</MenuItem>
					<MenuItem value={'Done'}>Done</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	);
};

export default FilterControls;
