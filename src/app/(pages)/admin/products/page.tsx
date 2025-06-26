import Container from '@/components/Container';
import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import { COUNT_PER_PAGE } from '@/constants';
import ProductsClient from '@/app/(pages)/admin/products/ProductsClient';
import getCategories from '@/app/actions/getCategories';
import Pagination from '@/components/pagination/Pagination';

interface ProductsPageProps {
  searchParams: ProductsPageSearchParams;
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
  const pageNum = sp.page ? Number(sp.page) : 1;
  const skipNum = sp.skip ? Number(sp.skip) : 0;
  const takeNum = sp.take ? Number(sp.take) : COUNT_PER_PAGE[0];

  const spProps = {
    ...sp,
    soldOut,
    suspension,
    page: pageNum,
    skip: skipNum,
    take: takeNum,
  };

  const products = await getProducts(spProps);
  const categories = await getCategories();

  console.log(products);

  return (
    <Container>
      <ProductsClient
        products={products}
        categories={categories}
        searchParams={spProps}
      />
      <Pagination
        page={pageNum}
        itemsPerPage={takeNum}
        totalItems={products.totalItems}
      />
    </Container>
  );
};

export default ProductsPage;
