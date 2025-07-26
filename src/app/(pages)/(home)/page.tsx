import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import Container from '@/components/shared/layout/Container';
import EmptyState from '@/components/shared/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import FloatingButton from '@/components/shared/button/FloatingButton';
import Categories from '@/components/page/client/categories/Categories';
import getCategories from '@/app/actions/getCategories';
import { PRODUCTS_PER_PAGE } from '@/constants';
import ProductDisplay from '@/components/page/client/home/ProductDisplay';

interface HomeProps {
  searchParams: Promise<ProductsParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;

  const { categoryId, skip } = sp;

  const skipNum = skip ? Number(skip) : 0;

  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getCategories(),
  ]);

  const hasUserRole = currentUser && currentUser.userType === 'User';

  const spProps: ProductsParams = {
    ...sp,
    soldOut: false,
    suspension: false,
    take: PRODUCTS_PER_PAGE,
    skip: skipNum,
  };

  const products = await getProducts(spProps);
  const hasProducts = products.data.length > 0;

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  return (
    <Container>
      <Categories categories={categories} />

      {hasProducts ? (
        <ProductDisplay
          products={products}
          currentUser={currentUser}
          selectedCategory={selectedCategory}
          skipNum={skipNum}
        />
      ) : (
        <EmptyState showReset />
      )}

      {hasUserRole && (
        <FloatingButton href="/products/upload">+</FloatingButton>
      )}
    </Container>
  );
}
