'use client';

import { Category, Product } from '@/prisma/client';
import dynamic from 'next/dynamic';
import { ProductsByFiltersParams } from '@/app/actions/getProducts';

interface HistoriesLoaderProps {
  searchParams: ProductsByFiltersParams;
  products: {
    data: (Product & { category: Category })[];
    totalItems: number;
  };
  categories: Category[];
}

const HistoriesClient = dynamic(
  () => import('@/app/(pages)/histories/HistoriesClient'),
  { ssr: false },
);

const HistoriesLoader = ({
  searchParams,
  products,
  categories,
}: HistoriesLoaderProps) => {
  return (
    <HistoriesClient
      searchParams={searchParams}
      products={products}
      categories={categories}
    />
  );
};

export default HistoriesLoader;
