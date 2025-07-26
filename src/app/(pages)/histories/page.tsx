import Container from '@/components/shared/layout/Container';
import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import { COUNT_PER_PAGE } from '@/constants';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import Pagination from '@/components/shared/pagination/Pagination';
import HistoriesLoader from './HistoriesLoader';

interface HistoriesPageProps {
  searchParams: Promise<HistoriesPageProductsParams>;
}

export type HistoriesPageProductsParams = Omit<
  ProductsParams,
  'soldOut' | 'suspension'
> & {
  soldOut?: string;
  suspension?: string;
};

const HistoriesPage = async ({ searchParams }: HistoriesPageProps) => {
  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getCategories(),
  ]);

  if (!currentUser) {
    return null;
  }

  const sp = await searchParams;

  const soldOut = sp.soldOut ? sp.soldOut === 'true' : undefined;
  const suspension = sp.suspension ? sp.suspension === 'true' : undefined;
  const skipNum = sp.skip ? Number(sp.skip) : 0;
  const takeNum = sp.take ? Number(sp.take) : COUNT_PER_PAGE[0];

  const spProps = {
    ...sp,
    soldOut,
    suspension,
    skip: skipNum,
    take: takeNum,
    userId: currentUser.id,
  };

  const products = await getProducts(spProps);

  return (
    <Container>
      <HistoriesLoader
        searchParams={spProps}
        products={products}
        categories={categories}
      />
      <Pagination
        skip={skipNum}
        itemsPerPage={takeNum}
        totalItems={products.totalItems}
      />
    </Container>
  );
};

export default HistoriesPage;
