import { TUserWidthChat } from '@/types';
import Input from '@/components/chat/Input';
import ChatHeader from '@/components/chat/ChatHeader';
import Message from '@/components/chat/Message';
import { useEffect, useRef } from 'react';

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
    return <div className="w-full h-full"></div>;

  return (
    <div className="w-full">
      <div>
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
      </div>
      <div className="flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]">
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
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-3">
        <Input
          receiverId={receiver.receiverId}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
};

export default Chat;
