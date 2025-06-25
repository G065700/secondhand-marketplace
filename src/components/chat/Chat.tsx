import { TUserWidthChat } from '@/types';
import Input from '@/components/chat/Input';
import ChatHeader from '@/components/chat/ChatHeader';
import Message from '@/components/chat/Message';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/joy';

interface ChatProps {
  currentUser: TUserWidthChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setShowChat: (showChat: boolean) => void;
}

const Chat = ({ currentUser, receiver, setShowChat }: ChatProps) => {
  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId),
  );

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  if (!receiver.receiverName || !currentUser)
    return <div className="w-full h-full" />;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box>
        <ChatHeader
          setShowChat={setShowChat}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </Box>

      {/* Messages */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          p: 4,
          overflow: 'auto',
          height: 'calc(100vh - 267px)',
        }}
      >
        {conversation &&
          conversation.messages.map((message) => (
            <Message
              key={message.id}
              isSender={message.senderId === currentUser.id}
              messageText={message.text}
              messageImage={message.image}
              receiverName={receiver.receiverName}
              receiverImage={receiver.receiverImage}
              senderImage={currentUser.image}
              time={message.createdAt}
            />
          ))}
        <Box ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Input
          receiverId={receiver.receiverId}
          currentUserId={currentUser.id}
        />
      </Box>
    </Box>
  );
};

export default Chat;
