import { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import pfpList from '../../assets/pfps/gifs';

interface Props {
	changePfp: (pfp: string) => void;
}

const PfpSelector = ({ changePfp }: Props) => {
	const [pfpIndex, setPfpIndex] = useState(5);
	useEffect(() => {
		changePfp(pfpList[pfpIndex]);
	});

	const handleClick = (direction: number) => {
		if (direction === -1) {
			setPfpIndex(pfpIndex === 0 ? pfpList.length - 1 : pfpIndex - 1);
		} else {
			setPfpIndex(pfpIndex === pfpList.length - 1 ? 0 : pfpIndex + 1);
		}

		changePfp(pfpList[pfpIndex]);
	};

	return (
		<Stack direction="column" width="100%" height="100%" justifyContent="center" alignItems="center" spacing={2}>
			<Typography variant="h5">Select Your Quester</Typography>
			<Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
				<IconButton onClick={() => handleClick(-1)} aria-label="delete" size="large" sx={{ fontSize: '3rem' }}>
					<ArrowCircleLeftIcon fontSize="inherit" />
				</IconButton>
				<Box
					component="img"
					src={pfpList[pfpIndex]}
					alt="Profile picture"
					width={{xs: '100px', lg: '200px'}}
				/>
				<IconButton onClick={() => handleClick(1)} aria-label="delete" size="large" sx={{ fontSize: '3rem' }}>
					<ArrowCircleRightIcon fontSize="inherit" />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default PfpSelector;
