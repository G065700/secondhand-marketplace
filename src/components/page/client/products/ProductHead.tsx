import { User } from '@/prisma/client';
import Heading from '@/components/shared/Heading';
import Image from 'next/image';
import HeartButton from '@/components/shared/button/HeartButton';
import { Box } from '@mui/joy';

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  productUserId: string;
  currentUser?: User | null;
}

const ProductHead = ({
  title,
  imageSrc,
  id,
  productUserId,
  currentUser,
}: ProductHeadProps) => {
  return (
    <>
      <Heading title={title} />
      <Box
        width="100%"
        height="60vh"
        overflow="hidden"
        borderRadius="xl"
        position="relative"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        {currentUser &&
          currentUser.userType !== 'Admin' &&
          currentUser.id !== productUserId && (
            <Box position="absolute" top={5} right={5}>
              <HeartButton productId={id} currentUser={currentUser} />
            </Box>
          )}
      </Box>
    </>
  );
};

export default ProductHead;
