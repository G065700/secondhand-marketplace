'use client';

import { User } from '@/prisma/client';
import dynamic from 'next/dynamic';

interface ChatLoaderProps {
  currentUser?: User | null;
  receiverUser?: User | null;
}

const ChatClient = dynamic(() => import('@/app/(pages)/chat/ChatClient'), {
  ssr: false,
});

const ChatLoader = ({ currentUser, receiverUser }: ChatLoaderProps) => {
  return <ChatClient currentUser={currentUser} receiverUser={receiverUser} />;
};

export default ChatLoader;
