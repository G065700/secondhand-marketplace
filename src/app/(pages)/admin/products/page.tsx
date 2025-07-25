import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import Container from '@/components/shared/layout/Container';
import { COUNT_PER_PAGE } from '@/constants';
import ProductsClient from '@/app/(pages)/admin/products/ProductsClient';
import getCategories from '@/app/actions/getCategories';
import Pagination from '@/components/shared/pagination/Pagination';

interface ProductsPageProps {
  searchParams: Promise<ProductsPageSearchParams>;
}

export type ProductsPageSearchParams = Omit<
  ProductsParams,
  'soldOut' | 'suspension'
> & {
  soldOut?: string;
  suspension?: string;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
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
  };

  const [products, categories] = await Promise.all([
    getProducts(spProps),
    getCategories(),
  ]);

  return (
    <Container>
      <ProductsClient
        products={products}
        categories={categories}
        searchParams={spProps}
      />
      <Pagination
        skip={skipNum}
        itemsPerPage={takeNum}
        totalItems={products.totalItems}
      />
    </Container>
  );
};

export default ProductsPage;
