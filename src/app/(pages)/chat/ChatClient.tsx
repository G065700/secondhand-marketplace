'use client';

import { User } from '@/prisma/client';
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { TUserWidthChat } from '@/types';
import Contacts from '@/components/chat/Contacts';
import Chat from '@/components/chat/Chat';

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
    <main className="pt-[56px]">
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        <section className={`md:flex ${showChat && 'hidden'}`}>
          <Contacts
            users={users}
            currentUser={currentUserWithChat}
            setShowChat={setShowChat}
            setReceiver={setReceiver}
          />
        </section>
        <section className={`md:flex ${!showChat && 'hidden'}`}>
          <Chat
            currentUser={currentUserWithChat}
            receiver={receiver}
            setShowChat={setShowChat}
          />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
