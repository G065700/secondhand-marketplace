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
        <div className="mt-10">
          <Heading
            title={
              categoryId
                ? `${getCategory(categoryId)?.name}`
                : '최근에 등록됐어요!'
            }
          />
          <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {products.data.map((product) => (
              <ProductCard
                key={product.id}
                currentUser={currentUser}
                product={product}
                category={getCategory(product.categoryId)}
              />
            ))}
          </div>

          <Pagination page={pageNum} totalItems={products.totalItems} />
        </div>
      )}
      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  );
}
