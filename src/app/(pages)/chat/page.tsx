import getCurrentUser from '@/app/actions/getCurrentUser';
import ChatClient from '@/app/(pages)/chat/ChatClient';

const ChatPage = async () => {
  const currentUser = await getCurrentUser();

  return <ChatClient currentUser={currentUser} />;
};

export default ChatPage;
