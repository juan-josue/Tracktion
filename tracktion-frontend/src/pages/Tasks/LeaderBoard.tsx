import { Box, Stack, Typography } from '@mui/material';

import { Member } from '../../types/types';
import LeaderBoardItem from './LeaderBoardItem';

interface Props {
	members: Member[];
}

const LeaderBoard = ({ members }: Props) => {
	members.sort((a: Member, b: Member) => {
		if (b.level === a.level) return b.xp - a.xp;
		return b.level - a.level;
	});

	return (
		<Box p={2} height="100%" display='flex' justifyContent={'center'}>
			<Stack spacing={2}>
				<Typography variant="h5">Top Questers</Typography>
				<Stack direction="row" spacing={4} alignItems="center">
					{members[1] && <LeaderBoardItem isLeader={false} member={members[1]} />}
					{members[0] && <LeaderBoardItem isLeader={true} member={members[0]} />}
					{members[2] && <LeaderBoardItem isLeader={false} member={members[2]} />}
				</Stack>
			</Stack>
		</Box>
	);
};

export default LeaderBoard;
