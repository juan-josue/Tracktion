import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    buttonText: string,
    content: React.ReactNode,
}

const Modal = ({buttonText, content} : Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Button variant='contained' color='secondary' onClick={toggleModal} endIcon={<AddBoxIcon/>}>{buttonText}</Button>

			{isOpen && (
				<Box
					height="100vh"
					width="100%"
                    p={4}
					display="flex"
					justifyContent="center"
					alignItems="center"
					bgcolor="rgba( 0, 0, 0, 0.4 )"
					boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
                    zIndex={100}
					sx={{
						position: 'fixed',
						top: 0,
						right: 0,
						backdropFilter: 'blur(10px)',
						WebkitBackdropFilter: 'blur(10px)',
					}}
				>
					<Box height='100%' width={{xs: '100%', md:'40%'}} position='relative' bgcolor='primary.main' p={4} pt={8} borderRadius='15px' boxShadow='0px 7px 14px 3px rgba(0,0,0,0.5);'>
						<IconButton onClick={toggleModal} sx={{ position: 'absolute', top: 15, right: 15 }}>
                            <CloseIcon fontSize='large'/>
                        </IconButton>
                        {content}
					</Box>
				</Box>
			)}
		</>
	);
};

export default Modal;
