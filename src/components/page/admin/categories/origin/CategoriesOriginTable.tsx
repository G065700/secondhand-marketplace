import { Category } from '@/prisma/client';
import { Sheet, Table } from '@mui/joy';
import { ComponentProps } from 'react';

interface CategoriesOriginTableProps {
  categories: Category[];
}

const CategoriesOriginTable = (props: CategoriesOriginTableProps) => {
  return (
    <Sheet
      variant="soft"
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
        <CategoriesOriginTableHeader />
        <CategoriesOriginTableBody {...props} />
      </Table>
    </Sheet>
  );
};

export default CategoriesOriginTable;

const CategoriesOriginTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ width: 60, verticalAlign: 'middle' }}>순서</th>
        <th style={{ verticalAlign: 'middle' }}>카테고리명</th>
      </tr>
    </thead>
  );
};

const CategoriesOriginTableBody = (
  props: ComponentProps<typeof CategoriesOriginTable>,
) => {
  const { categories } = props;

  return (
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td>{category.order}</td>
          <td>{category.name}</td>
        </tr>
      ))}
    </tbody>
  );
};
