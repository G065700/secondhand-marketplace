import Image from 'next/image';

interface AvatarProps {
  src: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || '/default-user-image.png'}
      alt="seller"
      height={30}
      width={30}
      className="w-10 h-10 rounded-full"
    />
  );
};

export default Avatar;
