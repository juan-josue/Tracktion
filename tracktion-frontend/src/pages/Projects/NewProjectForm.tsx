import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewProjectForm = () => {
	return (
		<Box mt={2} pr={2} width='50%'>
			<form>
				<Button
					variant="contained"
					type="submit"
					color="secondary"
					size="medium"
                    sx={{width: '100%'}}
					endIcon={<AddIcon />}
				>
					New Project
				</Button>
			</form>
		</Box>
	);
};

export default NewProjectForm;
