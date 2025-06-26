import Container from '@/components/Container';
import getProductById from '@/app/actions/getProductById';
import ProductClient from '@/app/(pages)/admin/products/[productId]/ProductClient';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface Params {
  productId?: string;
}

const ProductPage = async ({ params }: { params: Params }) => {
  const product = await getProductById(params);
  const currentUser = await getCurrentUser();

  if (!product) {
    return null;
  }

  return (
    <Container>
      <ProductClient product={product} currentUser={currentUser} />
    </Container>
  );
};

export default ProductPage;
