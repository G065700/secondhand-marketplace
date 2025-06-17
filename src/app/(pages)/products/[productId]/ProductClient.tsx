'use client';

import { Category, Product, User } from '@/prisma/client';
import Container from '@/components/Container';
import ProductHead from '@/components/products/ProductHead';
import ProductInfo from '@/components/products/ProductInfo';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

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

  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
    ssr: false,
  });

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10">
            <ProductInfo
              user={product.user}
              category={category}
              description={product.description}
              createdAt={product.createdAt}
            />
            <div>
              <KakaoMap
                isDetailPage
                latitude={product.latitude}
                longitude={product.longitude}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button
            label="판매자와 대화하기"
            onClick={() => router.push('/chat')}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
