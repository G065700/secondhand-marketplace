'use client';

import { Category, Product, User } from '@/prisma/client';
import { Box, Divider } from '@mui/joy';
import ProductSuspensionUpdate from '@/components/page/admin/product/ProductSuspensionUpdate';
import ProductDetail from '@/components/page/admin/product/ProductDetail';

interface ProductClientProps {
  product: Product & { category: Category; user: User };
  currentUser?: User | null;
}

const ProductClient = (props: ProductClientProps) => {
  const { product } = props;

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth="lg" mx="auto">
      <Divider />
      <ProductSuspensionUpdate
        productId={product.id}
        productSuspension={product.suspension}
      />
      <Divider />
      <ProductDetail {...props} />
    </Box>
  );
};

export default ProductClient;
