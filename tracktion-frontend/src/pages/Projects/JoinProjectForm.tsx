import { Box, TextField, Button, Stack } from '@mui/material';

const JoinProjectForm = () => {
	return (
		<Box mt={2} pr={2} width='50%'>
			<form>
				<Stack direction='column' spacing={2}>
					<TextField
						variant="outlined"
						label="Join Code"
						color="secondary"
						placeholder="XXXX-XXXX"
						size="medium"
					/>
					<Button variant="contained" type="submit" color="secondary" size="medium">
						Join
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default JoinProjectForm;
