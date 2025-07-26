'use client';

import { Category, Product, User } from '@/prisma/client';
import { Box, Grid } from '@mui/joy';
import Heading from '@/components/shared/Heading';
import ProductCard from '@/components/page/client/products/ProductCard';
import Pagination from '@/components/shared/pagination/Pagination';
import { PRODUCTS_PER_PAGE } from '@/constants';

interface ProductDisplayProps {
  products: {
    data: (Product & { category: Category })[];
    totalItems: number;
  };
  currentUser?: User | null;
  selectedCategory?: Category | undefined;
  skipNum: number;
}

const ProductDisplay = ({
  products,
  currentUser,
  selectedCategory,
  skipNum,
}: ProductDisplayProps) => {
  const { data, totalItems } = products;

  return (
    <Box mt={5}>
      <Heading title={selectedCategory ? selectedCategory.name : '전체 상품'} />
      <Grid
        mt={2}
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
      >
        {data.map((product) => (
          <ProductCard
            key={product.id}
            currentUser={currentUser}
            product={product}
          />
        ))}
      </Grid>

      <Pagination
        skip={skipNum}
        itemsPerPage={PRODUCTS_PER_PAGE}
        totalItems={totalItems}
      />
    </Box>
  );
};

export default ProductDisplay;
