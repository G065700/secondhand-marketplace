import ProductHead from '@/components/page/client/products/ProductHead';
import ProductInfo from '@/components/page/client/products/ProductInfo';
import { Box } from '@mui/joy';
import dynamic from 'next/dynamic';
import { Category, Product, User } from '@/prisma/client';

interface ProductDetailProps {
  product: Product & { category: Category; user: User };
  currentUser?: User | null;
}

const ProductDetail = ({ product, currentUser }: ProductDetailProps) => {
  const KakaoMap = dynamic(() => import('@/components/shared/KakaoMap'), {
    ssr: false,
  });

  return (
    <>
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
          category={product.category}
          description={product.description}
          createdAt={product.createdAt}
        />
        <KakaoMap
          isDetailPage
          latitude={product.latitude}
          longitude={product.longitude}
        />
      </Box>
    </>
  );
};

export default ProductDetail;
