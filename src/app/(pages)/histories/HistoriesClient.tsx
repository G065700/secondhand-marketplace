'use client';

import { Category, Product } from '@/prisma/client';
import HistoryListFilter from '@/components/page/client/histories/HistoryListFilter';
import { ProductsParams } from '@/app/actions/getProducts';
import { Box, Divider } from '@mui/joy';
import HistoryListSummary from '@/components/page/client/histories/HistoryListSummary';
import HistoryListTable from '@/components/page/client/histories/HistoryListTable';

interface HistoriesClientProps {
  searchParams: ProductsParams;
  products: {
    data: (Product & { category: Category })[];
    totalItems: number;
  };
  categories: Category[];
}

const HistoriesClient = ({
  searchParams,
  products,
  categories,
}: HistoriesClientProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <Divider />
      <HistoryListFilter categories={categories} searchParams={searchParams} />
      <Divider />
      <HistoryListSummary
        searchParams={searchParams}
        totalItems={products.totalItems}
      />
      <HistoryListTable
        data={products.data}
        totalItems={products.totalItems}
        skip={searchParams.skip}
      />
    </Box>
  );
};

export default HistoriesClient;
