import { Category, Product } from '@/prisma/client';
import { Box, Button, Sheet, Table } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { ComponentProps, memo, useCallback } from 'react';

interface HistoryListProps {
  data: (Product & { category: Category })[];
  totalItems: number;
  skip: number;
}

const HistoryListTable = (props: HistoryListProps) => {
  return (
    <Sheet variant="outlined" sx={{ maxHeight: 433, overflow: 'auto' }}>
      <Table
        stickyHeader
        hoverRow
        sx={() => ({
          '& tr > *': { bgcolor: 'black', color: 'white' },
          '& td': { bgcolor: 'white', color: 'black' },
          '--Table-headerUnderlineThickness': 0,
        })}
      >
        <HistoryListTableHeader />
        <HistoryListTableBody {...props} />
      </Table>
    </Sheet>
  );
};

export default HistoryListTable;

const HistoryListTableHeader = memo(function HistoryListTableHeader() {
  return (
    <thead>
      <tr>
        <th style={{ width: 60, verticalAlign: 'middle' }}>No.</th>
        <th style={{ verticalAlign: 'middle' }}>상품명</th>
        <th style={{ verticalAlign: 'middle' }}>카테고리</th>
        <th style={{ verticalAlign: 'middle' }}>가격</th>
        <th style={{ width: '10%', verticalAlign: 'middle' }}>판매 완료</th>
        <th style={{ width: '10%', verticalAlign: 'middle' }}>판매 중지</th>
        <th style={{ width: 70 }} />
      </tr>
    </thead>
  );
});

const HistoryListTableBody = (
  props: ComponentProps<typeof HistoryListTable>,
) => {
  const router = useRouter();
  const { data, totalItems, skip } = props;

  const handleProductUpdateBtnClick = useCallback(
    (productId: string) => {
      router.push(`/products/update/${productId}`);
    },
    [router],
  );

  return (
    <tbody>
      {data.length === 0 && (
        <tr>
          <td colSpan={6} align="center">
            <strong>데이터가 존재하지 않습니다.</strong>
          </td>
        </tr>
      )}
      {data.length > 0 &&
        data.map((row, rowIdx) => (
          <tr key={row.id}>
            <td>{totalItems - skip - rowIdx}</td>
            <td>{row.title}</td>
            <td>{row.category.name}</td>
            <td>{row.price.toLocaleString()} 원</td>
            <td>{row.soldOut ? 'Y' : 'N'}</td>
            <td>{row.suspension ? 'Y' : 'N'}</td>
            <td>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => handleProductUpdateBtnClick(row.id)}
                >
                  수정
                </Button>
              </Box>
            </td>
          </tr>
        ))}
    </tbody>
  );
};
