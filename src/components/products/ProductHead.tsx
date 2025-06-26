import { User } from '@/prisma/client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import HeartButton from '@/components/HeartButton';

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ProductHead = ({
  title,
  imageSrc,
  id,
  currentUser,
}: ProductHeadProps) => {
  return (
    <>
      <Heading title={title} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        {currentUser?.userType !== 'Admin' && (
          <div className="absolute top-5 right-5">
            <HeartButton productId={id} currentUser={currentUser} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductHead;
