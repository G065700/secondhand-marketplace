import { useRouter } from 'next/navigation';

import { ProductsParams } from '@/app/actions/getProducts';
import { COUNT_PER_PAGE } from '@/constants';
import { Select, Typography, Box } from '@mui/joy';
import SelectOption from '@/components/shared/select/SelectOption';
import { useCallback } from 'react';

interface HistoryListSummaryProps {
  searchParams: ProductsParams;
  totalItems: number;
}

const HistoryListSummary = ({
  searchParams,
  totalItems,
}: HistoryListSummaryProps) => {
  const router = useRouter();

  const handleProductsPerPage = useCallback(
    (productsPerPage: number) => {
      const queryStrArr: string[] = [];

      const sp: ProductsParams & { [key: string]: any } = {
        ...searchParams,
        skip: 0,
        take: productsPerPage,
      };

      Object.keys(sp).forEach((key) => {
        queryStrArr.push(`${key}=${sp[key]}`);
      });

      router.push(`?${queryStrArr.join('&')}`);
    },
    [router, searchParams],
  );

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Select
        variant="soft"
        size="sm"
        sx={{ boxShadow: 'none' }}
        slotProps={{
          listbox: {
            sx: {
              boxShadow: 'none',
            },
          },
        }}
        value={searchParams.take || COUNT_PER_PAGE[0]}
        onChange={(_, value) => {
          if (value) {
            handleProductsPerPage(value);
          }
        }}
      >
        {COUNT_PER_PAGE.map((size) => (
          <SelectOption key={size} value={size}>
            {`${size}개씩 보기`}
          </SelectOption>
        ))}
      </Select>

      <Typography level="body-sm">
        총 <strong>{totalItems}</strong> 건
      </Typography>
    </Box>
  );
};

export default HistoryListSummary;
