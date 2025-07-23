import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import Container from '@/components/shared/layout/Container';
import EmptyState from '@/components/shared/EmptyState';
import ProductCard from '@/components/page/client/products/ProductCard';
import getCurrentUser from '@/app/actions/getCurrentUser';
import FloatingButton from '@/components/shared/button/FloatingButton';
import Categories from '@/components/page/client/categories/Categories';
import Pagination from '@/components/shared/pagination/Pagination';
import getCategories from '@/app/actions/getCategories';
import Heading from '@/components/shared/Heading';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { Box, Grid } from '@mui/joy';

interface HomeProps {
  searchParams: Promise<ProductsParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;

  const { categoryId, skip } = sp;

  const skipNum = skip ? Number(skip) : 0;

  const currentUser = await getCurrentUser();
  const hasUserRole = currentUser && currentUser.userType === 'User';

  const categories = await getCategories();

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
        <Box mt={5}>
          <Heading
            title={selectedCategory ? selectedCategory.name : '전체 상품'}
          />
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
            {products.data.map((product) => (
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
            totalItems={products.totalItems}
          />
        </Box>
      ) : (
        <EmptyState showReset />
      )}

      {hasUserRole && (
        <FloatingButton href="/products/upload">+</FloatingButton>
      )}
    </Container>
  );
}
