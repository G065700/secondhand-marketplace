import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ProductCard from '@/components/products/ProductCard';
import getCurrentUser from '@/app/actions/getCurrentUser';
import FloatingButton from '@/components/FloatingButton';
import Categories from '@/components/categories/Categories';
import Pagination from '@/components/Pagination';

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const page = (await searchParams).page;
  const pageNum = page ? Number(page) : 1;

  const currentUser = await getCurrentUser();
  const products = await getProducts(await searchParams);

  return (
    <Container>
      <Categories />
      {products.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products.data.map((product) => (
              <ProductCard
                key={product.id}
                currentUser={currentUser}
                data={product}
              />
            ))}
          </div>

          <Pagination page={pageNum} totalItems={products.totalItems} />

          <FloatingButton href="/products/upload">+</FloatingButton>
        </>
      )}
    </Container>
  );
}
