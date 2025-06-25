'use client';

import { useSearchParams } from 'next/navigation';
import CategoryBox from '@/components/categories/CategoryBox';
import { Category } from '@/prisma/client';
import { Grid, Sheet } from '@mui/joy';

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const params = useSearchParams();
  const categoryIdParam = params?.get('categoryId');

  return (
    <Sheet variant="soft" sx={{ p: 3, borderRadius: 'lg' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          flexGrow: 1,
        }}
      >
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

export default Categories;
