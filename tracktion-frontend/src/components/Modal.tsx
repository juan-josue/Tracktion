import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    button: React.ReactNode;
    content: React.ReactNode,
}

const Modal = ({button, content} : Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div onClick={toggleModal}>{button}</div>

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
					<Box height='auto' minHeight='auto' width={{xs: '100%', sm: '80%', md:'60%', lg: '50%'}} position='relative' bgcolor='primary.main' p={4} pt={8} borderRadius='15px' boxShadow='0px 7px 14px 3px rgba(0,0,0,0.5);'>
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
