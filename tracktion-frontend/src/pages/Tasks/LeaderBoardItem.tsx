import { Stack, Box, Typography } from '@mui/material';

import { Member } from '../../types/types';

interface Props {
	member: Member;
	isLeader: boolean;
}

const LeaderBoardItem = ({ member, isLeader }: Props) => {
	const borderRadiusSize = isLeader ? '65px' : '50px';
	const circleSize = isLeader ? '130px' : '100px';
	const pfpSize = isLeader ? '80px' : '60px';
	const textColor = isLeader ? 'accent.main' : 'typography.main';

	return (
		<Stack direction="column" alignItems="center" spacing={1}>
			<Box
				borderRadius={borderRadiusSize}
				width={circleSize}
				height={circleSize}
				bgcolor="primary.main"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<img src={member.user.pfp} height={pfpSize}></img>
			</Box>
			<Box display="flex" flexDirection={'column'} alignItems="center">
				<Typography variant="body1" fontWeight="bold" color={textColor}>
					{member.user.name}
				</Typography>
				<Typography variant="body1">{`Level ${member.level}`}</Typography>
			</Box>
		</Stack>
	);
};

export default LeaderBoardItem;
