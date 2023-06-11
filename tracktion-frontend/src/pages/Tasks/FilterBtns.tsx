import { Stack, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterBtns = () => {
	return (
		<Stack direction={'row'} spacing={2}>
			<Button variant="outlined" color="secondary" endIcon={<ArrowDropDownIcon />}>
				Id
			</Button>
			<Button variant="outlined" color="secondary" endIcon={<ArrowDropDownIcon />}>
				Priority
			</Button>
			<Button variant="outlined" color="secondary" endIcon={<ArrowDropDownIcon />}>
				Status
			</Button>
		</Stack>
	);
};

export default FilterBtns;
