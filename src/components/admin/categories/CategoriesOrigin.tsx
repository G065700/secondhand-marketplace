'use client';

import { Category } from '@/prisma/client';
import { Box } from '@mui/joy';
import CategoriesOriginHeader from '@/components/admin/categories/CategoriesOriginHeader';
import CategoriesOriginTable from '@/components/admin/categories/CategoriesOriginTable';

interface CategoriesOriginProps {
  categories: Category[];
}

const CategoriesOrigin = ({ categories }: CategoriesOriginProps) => {
  return (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <CategoriesOriginHeader updatedAt={categories[0].updatedAt} />
      <CategoriesOriginTable categories={categories} />
    </Box>
  );
};

export default CategoriesOrigin;
