'use client';

import { Category, Product, User } from '@/prisma/client';
import Container from '@/components/shared/layout/Container';
import ProductHead from '@/components/page/client/products/ProductHead';
import ProductInfo from '@/components/page/client/products/ProductInfo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import LargeButton from '@/components/shared/button/LargeButton';
import axios from 'axios';
import { Box } from '@mui/joy';

interface ProductClientProps {
  product: Product & { user: User };
  category: Category;
  currentUser?: User | null;
}

const ProductClient = ({
  product,
  category,
  currentUser,
}: ProductClientProps) => {
  const router = useRouter();

  const hasUserRole = currentUser && currentUser.userType === 'User';
  const isNotMyProduct = currentUser && currentUser.id !== product.userId;

  const KakaoMap = dynamic(() => import('@/components/shared/KakaoMap'), {
    ssr: false,
  });

  const handleConversationBtnClick = async () => {
    const receiverId = product.user.id;
    try {
      await axios.post('/api/conversation', {
        receiverId,
      });
      router.push(`/chat?receiverId=${receiverId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        maxWidth="lg"
        mx="auto"
      >
        <ProductHead
          title={product.title}
          imageSrc={product.imageSrc}
          id={product.id}
          productUserId={product.userId}
          currentUser={currentUser}
        />
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          gap={5}
          mt={3}
        >
          <ProductInfo
            user={product.user}
            category={category}
            description={product.description}
            createdAt={product.createdAt}
          />
          <KakaoMap
            isDetailPage
            latitude={product.latitude}
            longitude={product.longitude}
          />
        </Box>
        {hasUserRole && isNotMyProduct && (
          <Box mt={3}>
            <LargeButton fullWidth onClick={handleConversationBtnClick}>
              판매자와 대화하기
            </LargeButton>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductClient;
