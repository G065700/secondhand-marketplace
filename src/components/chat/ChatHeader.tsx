import { IoChevronBackCircleSharp } from 'react-icons/io5';
import Avatar from '@/components/Avatar';
import { formatTime } from '@/helpers/dayjs';

interface ChatHeaderProps {
  setShowChat: (showChat: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | undefined;
}

const ChatHeader = ({
  setShowChat,
  receiverName,
  receiverImage,
  lastMessageTime,
}: ChatHeaderProps) => {
  return (
    <div className="pl-4 border-b-[1px]">
      <div className="flex items-center h-16 gap-4">
        <div className="flex justify-center items-center text-3xl text-gray-400 hover:text-gray-600">
          <button onClick={() => setShowChat(false)} className="md:hidden">
            <IoChevronBackCircleSharp />
          </button>
        </div>

        <div className="flex items-center gap-[0.6rem]">
          <div>
            <Avatar src={receiverImage} />
          </div>
          <h2 className="text-lg font-semibold">
            {receiverName}
            {lastMessageTime && (
              <p className="text-gray-600">{formatTime(lastMessageTime)}</p>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
