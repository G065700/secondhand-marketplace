import Image from 'next/image';

interface NavUserProps {
  image: string | null;
  name: string | null;
}

const NavUser = ({ image, name }: NavUserProps) => {
  return (
    <div className="hidden sm:flex justify-end items-center gap-2 sm:min-w-[80px]">
      <Image
        src={image || '/default-user-image.png'}
        width={30}
        height={30}
        alt={name || ''}
        className="rounded-full"
      />
      <span>{name}</span>
    </div>
  );
};

export default NavUser;
