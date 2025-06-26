import { Category, Product } from '@/prisma/client';
import { useRouter } from 'next/navigation';
import { Box, Button, Sheet, Table } from '@mui/joy';

interface ProductListProps {
  data: (Product & { category: Category })[];
  totalItems: number;
  skip: number;
}

const ProductList = ({ data, totalItems, skip }: ProductListProps) => {
  const router = useRouter();
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
        <thead>
          <tr>
            <th style={{ width: 60, verticalAlign: 'middle' }}>No.</th>
            <th style={{ verticalAlign: 'middle' }}>상품명</th>
            <th style={{ verticalAlign: 'middle' }}>카테고리</th>
            <th style={{ width: '10%', verticalAlign: 'middle' }}>판매 완료</th>
            <th style={{ width: '10%', verticalAlign: 'middle' }}>판매 중지</th>
            <th style={{ width: 70 }} />
          </tr>
        </thead>
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
                <td>{row.soldOut ? 'Y' : 'N'}</td>
                <td>{row.suspension ? 'Y' : 'N'}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => router.push(`/admin/products/${row.id}`)}
                    >
                      수정
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default ProductList;
