'use client';

import { useSearchParams } from 'next/navigation';
import CategoryBox from '@/components/page/client/categories/CategoryBox';
import { Category } from '@/prisma/client';
import { Grid, Sheet } from '@mui/joy';
import { memo } from 'react';

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const params = useSearchParams();
  const categoryIdParam = params?.get('categoryId');

  return (
    <Sheet variant="solid" color="neutral" sx={{ p: 3, borderRadius: 'lg' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        flexGrow={1}
      >
        <CategoryBox label="전체" id="" selected={!categoryIdParam} />
        {categories.map((category) => (
          <CategoryBox
            key={category.id}
            label={category.name}
            id={category.id}
            selected={categoryIdParam === category.id}
          />
        ))}
      </Grid>
    </Sheet>
  );
};

export default memo(Categories);
