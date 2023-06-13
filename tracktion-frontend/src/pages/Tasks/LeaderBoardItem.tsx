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
        borderRadius={{ xs: '50%', sm: borderRadiusSize }}
        width={{ xs: '100%', sm: circleSize }}
        height={{ xs: '100%', sm: circleSize }}
        bgcolor="primary.main"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src={member.user.pfp}
          height={pfpSize}
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '50%',
          }}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body1" fontWeight="bold" color={textColor} noWrap>
          {member.user.name.split(' ')[0]}
        </Typography>
        <Typography variant="body1">{`Level ${member.level}`}</Typography>
      </Box>
    </Stack>
  );
};

export default LeaderBoardItem;
