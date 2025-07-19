'use client';

import { Box, Divider } from '@mui/joy';
import { Category, Product } from '@/prisma/client';
import { ProductsParams } from '@/app/actions/getProducts';
import ProductListFilter from '@/components/page/admin/products/ProductListFilter';
import ProductListSummary from '@/components/page/admin/products/ProductListSummary';
import ProductListTable from '@/components/page/admin/products/ProductListTable';

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
    <Box display="flex" flexDirection="column" gap={2.5}>
      <Divider />
      <ProductListFilter categories={categories} searchParams={searchParams} />
      <Divider />
      <ProductListSummary
        searchParams={searchParams}
        totalItems={products.totalItems}
      />
      <ProductListTable
        data={products.data}
        totalItems={products.totalItems}
        skip={searchParams.skip}
      />
    </Box>
  );
};

export default ProductsClient;
