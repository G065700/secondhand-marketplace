import getProductById from '@/app/actions/getProductById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ProductClient from '@/app/(pages)/products/[productId]/ProductClient';
import getCategories from '@/app/actions/getCategories';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const [currentUser, categories, product] = await Promise.all([
    getCurrentUser(),
    getCategories(),
    getProductById(productId),
  ]);

  if (!product) {
    notFound();
  }

  const category = categories.find(
    (category) => category.id === product.categoryId,
  );

  if (!category) {
    return null;
  }

  return (
    <ProductClient
      product={product}
      category={category}
      currentUser={currentUser}
    />
  );
};

export default ProductPage;
