'use client';

import { Box, Divider } from '@mui/joy';
import { Category, Product } from '@/prisma/client';
import ProductListFilter from '@/components/admin/products/ProductListFilter';
import { ProductsParams } from '@/app/actions/getProducts';
import ProductListSummary from '@/components/admin/products/ProductListSummary';
import ProductList from '@/components/admin/products/ProductList';

interface ProductsClientProps {
  products: {
    data: (Product & { category: Category })[];
    totalItems: number;
  };
  categories: Category[];
  searchParams: ProductsParams;
}

const ProductsClient = ({
  products,
  categories,
  searchParams,
}: ProductsClientProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <Divider />
      <ProductListFilter categories={categories} searchParams={searchParams} />
      <Divider />
      <ProductListSummary
        searchParams={searchParams}
        totalItems={products.totalItems}
      />
      <ProductList
        data={products.data}
        totalItems={products.totalItems}
        skip={searchParams.skip}
      />
    </Box>
  );
};

export default ProductsClient;
