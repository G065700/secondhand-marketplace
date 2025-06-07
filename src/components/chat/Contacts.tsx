import { TUserWidthChat } from '@/types';
import User from '@/components/chat/User';

interface ContactsProps {
  users: TUserWidthChat[];
  currentUser: TUserWidthChat;
  setShowChat: (showChat: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setShowChat,
  setReceiver,
}: ContactsProps) => {
  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null,
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || '',
      receiverImage: userImage || '',
    });
  };

  return (
    <div className="w-full overflow-auto h-[calc(100vh_-_56px)] border-[1px]">
      <h1 className="m-4 text-2xl font-semibold">Chat</h1>
      <hr />

      <div className="flex flex-col">
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser.id)
            .map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  filterMessages(user.id, user.name, user.image);
                  setShowChat(true);
                }}
              >
                <User user={user} currentUserId={currentUser.id} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Contacts;
