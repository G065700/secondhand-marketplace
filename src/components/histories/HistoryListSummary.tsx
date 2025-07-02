import { useRouter } from 'next/navigation';

import { ProductsParams } from '@/app/actions/getProducts';
import { COUNT_PER_PAGE } from '@/constants';
import { Select, Option, Typography } from '@mui/joy';

interface HistoryListSummaryProps {
  searchParams: ProductsParams;
  totalItems: number;
}

const HistoryListSummary = ({
  searchParams,
  totalItems,
}: HistoryListSummaryProps) => {
  const router = useRouter();

  const handleProductsPerPage = (productsPerPage: number) => {
    const queryStrArr: string[] = [];

    const sp: ProductsParams & { [key: string]: any } = {
      ...searchParams,
      page: 1,
      sip: 0,
      take: productsPerPage,
    };

    Object.keys(sp).forEach((key) => {
      queryStrArr.push(`${key}=${sp[key]}`);
    });

    router.push(`?${queryStrArr.join('&')}`);
  };

  return (
    <div className="flex justify-between items-center">
      <Select
        variant="soft"
        size="sm"
        value={
          (searchParams.skip || 0) / (searchParams.page || 1) ||
          COUNT_PER_PAGE[0]
        }
        onChange={(_, value) => {
          if (value) {
            handleProductsPerPage(value);
          }
        }}
      >
        {COUNT_PER_PAGE.map((size) => (
          <Option key={size} value={size}>{`${size}개씩 보기`}</Option>
        ))}
      </Select>

      <Typography level="body-sm">
        총 <strong>{totalItems}</strong> 건
      </Typography>
    </div>
  );
};

export default HistoryListSummary;
