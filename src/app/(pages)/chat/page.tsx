import getCurrentUser from '@/app/actions/getCurrentUser';
import getUserById from '@/app/actions/getUserById';
import EmptyState from '@/components/shared/EmptyState';
import ChatLoader from './ChatLoader';

interface ChatPageProps {
  params: Promise<{
    receiverId?: string;
  }>;
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { receiverId } = await params;

  const [currentUser, receiverUser] = await Promise.all([
    getCurrentUser(),
    receiverId ? getUserById(receiverId) : Promise.resolve(undefined),
  ]);

  if (currentUser && receiverId && receiverId === currentUser.id) {
    return <EmptyState title="잘못된 경로입니다." subtitle="" height="full" />;
  }

  return <ChatLoader currentUser={currentUser} receiverUser={receiverUser} />;
};

export default ChatPage;
