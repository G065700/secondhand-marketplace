'use client';

import { useSearchParams } from 'next/navigation';
import CategoryBox from '@/components/categories/CategoryBox';
import { Category } from '@/prisma/client';

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const params = useSearchParams();
  const categoryIdParam = params?.get('categoryId');

  return (
    <div className="flex flex-row justify-between items-center pt-4 overflow-x-auto">
      {categories.map((category) => (
        <CategoryBox
          key={category.id}
          label={category.name}
          id={category.id}
          selected={categoryIdParam === category.id}
        />
      ))}
    </div>
  );
};

export default Categories;
