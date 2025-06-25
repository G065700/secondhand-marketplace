import { TUserWidthChat } from '@/types';
import User from '@/components/chat/User';
import { Box, Divider, Typography } from '@mui/joy';

interface ContactsProps {
  users: TUserWidthChat[];
  currentUser: TUserWidthChat;
  setShowChat: (showChat: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setShowChat,
  setReceiver,
}: ContactsProps) => {
  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null,
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || '',
      receiverImage: userImage || '',
    });
  };

  const contactUsers = users.filter((user) => user.id !== currentUser.id);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 106px)',
        overflow: 'auto',
      }}
    >
      <Typography level="h4" sx={{ m: 2, fontWeight: 'lg' }}>
        DM
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {users.length > 0 &&
          contactUsers.map((user, userIdx) => (
            <Box
              key={user.id}
              onClick={() => {
                filterMessages(user.id, user.name, user.image);
                setShowChat(true);
              }}
            >
              <User
                user={user}
                currentUserId={currentUser.id}
                isLastUser={contactUsers.length === userIdx + 1}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Contacts;
