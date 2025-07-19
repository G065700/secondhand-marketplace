import getCurrentUser from '@/app/actions/getCurrentUser';
import ChatClient from '@/app/(pages)/chat/ChatClient';
import getUserById from '@/app/actions/getUserById';
import EmptyState from '@/components/shared/EmptyState';

interface ChatProps {
  searchParams: {
    receiverId?: string;
  };
}

const ChatPage = async ({ searchParams }: ChatProps) => {
  const { receiverId } = await searchParams;

  const currentUser = await getCurrentUser();
  const receiverUser = receiverId
    ? await getUserById({ userId: receiverId })
    : undefined;

  if (currentUser && receiverId && receiverId === currentUser.id) {
    return <EmptyState title="잘못된 경로입니다." subtitle="" height="full" />;
  }

  return <ChatClient currentUser={currentUser} receiverUser={receiverUser} />;
};

export default ChatPage;
