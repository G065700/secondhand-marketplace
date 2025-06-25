import { Category } from '@/prisma/client';
import { Sheet, Table } from '@mui/joy';

interface CategoriesOriginTableProps {
  categories: Category[];
}

const CategoriesOriginTable = ({ categories }: CategoriesOriginTableProps) => {
  return (
    <Sheet
      variant="outlined"
      sx={{ maxHeight: 'calc(100dvh - 145px)', overflow: 'auto' }}
    >
      <Table
        stickyHeader
        hoverRow
        sx={() => ({
          '& tr > *': {
            bgcolor: 'black',
            color: 'white',
          },
          '& td': { bgcolor: 'white', color: 'black' },
          '--Table-headerUnderlineThickness': 0,
        })}
      >
        <thead>
          <tr>
            <th style={{ width: 60, verticalAlign: 'middle' }}>순서</th>
            <th style={{ verticalAlign: 'middle' }}>카테고리명</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.order}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default CategoriesOriginTable;
