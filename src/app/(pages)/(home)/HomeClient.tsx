'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/shared/layout/Container';
import EmptyState from '@/components/shared/EmptyState';
import FloatingButton from '@/components/shared/button/FloatingButton';
import Categories from '@/components/page/client/categories/Categories';
import { PRODUCTS_PER_PAGE } from '@/constants';
import ProductDisplay from '@/components/page/client/home/ProductDisplay';
import { User, Category } from '@/prisma/client';

interface HomeClientProps {
  currentUser?: User | null;
  categories: Category[];
}

const HomeClient = ({ currentUser, categories }: HomeClientProps) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryId = searchParams?.get('categoryId');
      const skip = searchParams?.get('skip');
      const skipNum = skip ? Number(skip) : 0;

      const params = new URLSearchParams();

      if (categoryId) params.append('categoryId', categoryId);
      if (skipNum) params.append('skip', String(skipNum));
      params.append('take', String(PRODUCTS_PER_PAGE));
      params.append('soldOut', 'false');
      params.append('suspension', 'false');

      const response = await fetch(`/api/products?${params.toString()}`);
      const productsData = await response.json();
      setProducts(productsData);
    };

    fetchProducts();
  }, [searchParams]);

  const categoryId = searchParams?.get('categoryId');
  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  const hasUserRole = currentUser && currentUser.userType === 'User';

  if (!products) {
    return <div>Loading...</div>;
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
          skipNum={products.skip}
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
