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
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;

  const { categoryId, skip } = sp;

  const skipNum = skip ? Number(skip) : 0;

  const currentUser = await getCurrentUser();
  const categories = await getCategories();

  const spProps: ProductsParams = {
    ...sp,
    soldOut: false,
    suspension: false,
    take: PRODUCTS_PER_PAGE,
    skip: skipNum,
  };

  const products = await getProducts(spProps);

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  return (
    <Container>
      <Categories categories={categories} />

      {products.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <Box sx={{ mt: 5 }}>
          <Heading
            title={selectedCategory ? selectedCategory.name : '전체 상품'}
          />
          <Grid
            sx={{
              mt: 2,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              gap: 2,
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
      )}

      {currentUser && currentUser.userType === 'User' && (
        <FloatingButton href="/products/upload">+</FloatingButton>
      )}
    </Container>
  );
}
