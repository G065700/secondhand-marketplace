import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ProductCard from '@/components/products/ProductCard';
import getCurrentUser from '@/app/actions/getCurrentUser';
import FloatingButton from '@/components/FloatingButton';
import Categories from '@/components/categories/Categories';
import Pagination from '@/components/pagination/Pagination';
import getCategories from '@/app/actions/getCategories';
import Heading from '@/components/Heading';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { Box, Grid } from '@mui/joy';

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const page = (await searchParams).page;
  const categoryId = (await searchParams).categoryId;
  const pageNum = page ? Number(page) : 1;

  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  const products = await getProducts(await searchParams);

  const getCategory = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId);
  };

  return (
    <Container>
      <Categories categories={categories} />
      {products.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <Box sx={{ mt: 5 }}>
          <Heading
            title={
              categoryId ? `${getCategory(categoryId)?.name}` : '전체 상품'
            }
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
                category={getCategory(product.categoryId)}
              />
            ))}
          </Grid>

          <Pagination
            page={pageNum}
            itemsPerPage={PRODUCTS_PER_PAGE}
            totalItems={products.totalItems}
          />
        </Box>
      )}
      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  );
}
