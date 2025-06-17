import getProductById from '@/app/actions/getProductById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptyState from '@/components/EmptyState';
import ProductClient from '@/app/(pages)/products/[productId]/ProductClient';
import getCategories from '@/app/actions/getCategories';

interface Params {
  productId?: string;
}

const ProductPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  const product = await getProductById(params);

  if (!product) {
    return <EmptyState />;
  }

  const category = categories.find(
    (category) => category.id === product.categoryId,
  );

  if (!category) {
    return <EmptyState />;
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
