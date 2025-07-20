import getCurrentUser from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import getProductById from '@/app/actions/getProductById';
import { notFound } from 'next/navigation';
import ProductUpdateClient from '@/app/(pages)/products/update/[productId]/ProductUpdateClient';
import Container from '@/components/shared/layout/Container';

interface productUpdatePageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductUpdatePage = async ({ params }: productUpdatePageProps) => {
  const { productId } = await params;

  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  const product = await getProductById(productId);

  if (!product || !currentUser || currentUser.id !== product.userId) {
    return notFound();
  }

  return (
    <Container>
      <ProductUpdateClient product={product} categories={categories} />
    </Container>
  );
};

export default ProductUpdatePage;
