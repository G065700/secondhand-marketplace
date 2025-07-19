import getCurrentUser from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import getProductById from '@/app/actions/getProductById';
import EmptyState from '@/components/shared/EmptyState';
import ProductUpdateClient from '@/app/(pages)/products/update/[productId]/ProductUpdateClient';
import Container from '@/components/shared/layout/Container';

interface Params {
  productId?: string;
}

const ProductUpdatePage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  const product = await getProductById(params);

  if (!product || !currentUser || currentUser.id !== product.userId) {
    return <EmptyState />;
  }

  return (
    <Container>
      <ProductUpdateClient product={product} categories={categories} />
    </Container>
  );
};

export default ProductUpdatePage;
