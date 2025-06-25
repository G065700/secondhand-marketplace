'use client';

import { User } from '@/prisma/client';
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { TUserWidthChat } from '@/types';
import Contacts from '@/components/chat/Contacts';
import Chat from '@/components/chat/Chat';
import { Box, Sheet } from '@mui/joy';

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  });

  const [showChat, setShowChat] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: users,
    error,
    isLoading,
  } = useSWR('/api/chat', fetcher, {
    refreshInterval: 1000,
  });

  const currentUserWithChat = users?.find(
    (user: TUserWidthChat) => user.email === currentUser?.email,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Sheet
      sx={{
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '300px 1fr',
        },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 'md',
      }}
    >
      <Box
        sx={{
          display: {
            xs: showChat ? 'none' : 'flex',
            md: 'flex',
          },
        }}
      >
        <Contacts
          users={users}
          currentUser={currentUserWithChat}
          setShowChat={setShowChat}
          setReceiver={setReceiver}
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: showChat ? 'flex' : 'none',
            md: 'flex',
          },
          borderLeft: {
            md: '1px solid',
          },
          borderColor: {
            md: 'divider',
          },
        }}
      >
        <Chat
          currentUser={currentUserWithChat}
          receiver={receiver}
          setShowChat={setShowChat}
        />
      </Box>
    </Sheet>
  );
};

export default ChatClient;
