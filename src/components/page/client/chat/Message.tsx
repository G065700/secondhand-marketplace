import Avatar from '@/components/shared/Avatar';
import Image from 'next/image';
import ClientTimeDisplay from '@/components/shared/ClientTimeDisplay';

interface MessageProps {
  isSender: boolean;
  messageText?: string | null;
  messageImage?: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: MessageProps) => {
  return (
    <div
      className="grid w-full grid-cols-[40px_1fr] gap-3 mx-auto"
      style={{ direction: `${isSender ? 'rtl' : 'ltr'}` }}
    >
      <div>
        <Avatar src={isSender && senderImage ? senderImage : receiverImage} />
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex items-center gap-2 mb-2 text-sm">
          <span className="font-medium">{isSender ? 'You' : receiverName}</span>
          <span className="text-xs text-gray-500 opacity-80">
            <ClientTimeDisplay time={time} />
          </span>
        </div>
        {messageImage && (
          <div className="overflow-hidden rounded-md mx-[0.6rem] max-w-[80%]">
            <Image src={messageImage} width={300} height={300} alt="" />
          </div>
        )}
        {messageText && (
          <div
            className={`
              p-2 
              break-all 
              text-white
              rounded-lg 
              text-left
              ${isSender ? 'bg-teal-500 rounded-tr-none' : 'bg-gray-400 rounded-tl-none'}
            `}
          >
            <p>{messageText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
