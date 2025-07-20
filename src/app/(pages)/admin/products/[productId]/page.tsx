import Container from '@/components/shared/layout/Container';
import getProductById from '@/app/actions/getProductById';
import ProductClient from '@/app/(pages)/admin/products/[productId]/ProductClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const product = await getProductById(productId);
  const currentUser = await getCurrentUser();

  if (!product) {
    notFound();
  }

  return (
    <Container>
      <ProductClient product={product} currentUser={currentUser} />
    </Container>
  );
};

export default ProductPage;
