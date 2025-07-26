'use client';

import { User } from '@/prisma/client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { TUserWidthChat } from '@/types';
import Contacts from '@/components/page/client/chat/Contacts';
import Chat from '@/components/page/client/chat/Chat';
import { Box, Sheet } from '@mui/joy';
import Loader from '@/components/shared/Loader';
import Container from '@/components/shared/layout/Container';

interface ChatClientProps {
  currentUser?: User | null;
  receiverUser?: User | null;
}

const ChatClient = ({ currentUser, receiverUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  });

  useEffect(() => {
    setReceiver({
      receiverId: receiverUser?.id || '',
      receiverName: receiverUser?.name || '',
      receiverImage: receiverUser?.image || '',
    });
  }, [receiverUser]);

  const [showChat, setShowChat] = useState(false);

  const fetcher = useCallback(
    (url: string) => axios.get(url).then((res) => res.data),
    [],
  );

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

  if (isLoading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <Container>
      <Sheet
        variant="outlined"
        sx={{
          mx: 'auto',
          borderRadius: 'md',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '300px 1fr',
          },
        }}
      >
        <Box
          display={{
            xs: showChat ? 'none' : 'flex',
            md: 'flex',
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
          display={{
            xs: showChat ? 'flex' : 'none',
            md: 'flex',
          }}
          borderLeft={{
            md: '1px solid',
          }}
          borderColor={{
            md: 'divider',
          }}
        >
          <Chat
            currentUser={currentUserWithChat}
            receiver={receiver}
            setShowChat={setShowChat}
          />
        </Box>
      </Sheet>
    </Container>
  );
};

export default ChatClient;
