'use client';

import { Box } from '@mui/joy';
import { Category } from '@/prisma/client';
import CategoriesOriginHeader from '@/components/page/admin/categories/origin/CategoriesOriginHeader';
import CategoriesOriginTable from '@/components/page/admin/categories/origin/CategoriesOriginTable';

interface CategoriesOriginProps {
  categories: Category[];
}

const CategoriesOrigin = ({ categories }: CategoriesOriginProps) => {
  return (
    <Box width={250} display="flex" flexDirection="column" gap={2}>
      <CategoriesOriginHeader updatedAt={categories[0].updatedAt} />
      <CategoriesOriginTable categories={categories} />
    </Box>
  );
};

export default CategoriesOrigin;
