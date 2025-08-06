'use client';

import { useSearchParams } from 'next/navigation';
import Container from '@/components/shared/layout/Container';
import EmptyState from '@/components/shared/EmptyState';
import FloatingButton from '@/components/shared/button/FloatingButton';
import Categories from '@/components/page/client/categories/Categories';
import ProductDisplay from '@/components/page/client/home/ProductDisplay';
import { User, Category, Product } from '@/prisma/client';
import Loader from '@/components/shared/Loader';

interface HomeClientProps {
  currentUser?: User | null;
  categories: Category[];
  products: {
    data: (Product & { category: Category })[];
    totalItemsCount: number;
  };
}

const HomeClient = ({ currentUser, categories, products }: HomeClientProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get('categoryId');
  const skip = searchParams?.get('skip');
  const skipNum = skip ? Number(skip) : 0;

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  const hasUserRole = currentUser && currentUser.userType === 'User';

  if (!products) {
    return <Loader />;
  }

  const hasProducts = products.data.length > 0;

  return (
    <Container>
      <Categories categories={categories} />
      {hasProducts ? (
        <ProductDisplay
          products={products}
          currentUser={currentUser}
          selectedCategory={selectedCategory}
          skipNum={skipNum}
        />
      ) : (
        <EmptyState showReset />
      )}
      {hasUserRole && (
        <FloatingButton href="/products/upload">+</FloatingButton>
      )}
    </Container>
  );
};

export default HomeClient;
