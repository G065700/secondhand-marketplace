import getCurrentUser from '@/app/actions/getCurrentUser';
import ChatClient from '@/app/(pages)/chat/ChatClient';
import Container from '@/components/Container';

const ChatPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <ChatClient currentUser={currentUser} />
    </Container>
  );
};

export default ChatPage;
