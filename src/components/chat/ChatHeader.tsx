import { IoChevronBackCircleSharp } from 'react-icons/io5';
import Avatar from '@/components/Avatar';
import { formatTime } from '@/helpers/dayjs';
import { Box, IconButton, Typography } from '@mui/joy';

interface ChatHeaderProps {
  setShowChat: (showChat: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | undefined;
}

const ChatHeader = ({
  setShowChat,
  receiverName,
  receiverImage,
  lastMessageTime,
}: ChatHeaderProps) => {
  return (
    <Box sx={{ pl: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 62, gap: 4 }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            fontSize: '3rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={() => setShowChat(false)}
            variant="plain"
            sx={{ padding: 0 }}
          >
            <IoChevronBackCircleSharp size={30} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Avatar src={receiverImage} />

          <Typography
            level="title-md"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {receiverName}
            {lastMessageTime && (
              <Typography level="body-xs" sx={{ color: 'text.secondary' }}>
                {formatTime(lastMessageTime)}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHeader;
