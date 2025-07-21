import { TUserWidthChat } from '@/types';
import Avatar from '@/components/shared/Avatar';
import { fromNow } from '@/helpers/dayjs';
import { Box, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';

interface UserProps {
  user: TUserWidthChat;
  currentUserId: string;
  isLastUser: boolean;
}

const User = ({ user, currentUserId, isLastUser }: UserProps) => {
  const messagesWithCurrentUser = user.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === currentUserId),
  );
  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0];

  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (latestMessage) {
      setTimeAgo(fromNow(latestMessage.createdAt));
    }
  }, [latestMessage]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderBottom: `${!isLastUser && '1px solid'}`,
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'divider',
        },
      }}
    >
      <Avatar src={user.image} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0,
          marginLeft: 2,
        }}
      >
        <Typography level="body-sm" fontWeight="md">
          {user.name}
        </Typography>

        {latestMessage?.text && (
          <Typography
            level="body-xs"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: 'calc(100dvw - 204px)',
            }}
          >
            {latestMessage.text}
          </Typography>
        )}

        {latestMessage?.image && (
          <Typography level="body-xs" sx={{ fontWeight: 500 }}>
            [이미지]
          </Typography>
        )}
      </Box>

      <Box>
        {latestMessage && (
          <Typography
            level="body-xs"
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '60px' }}
          >
            {timeAgo}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default User;
