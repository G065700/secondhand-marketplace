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
    <div
      className="
        grid
        grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7
        border border-neutral-300
        rounded-lg overflow-hidden
        text-sm
      "
    >
      {categories.map((category) => (
        <CategoryBox
          key={category.id}
          label={category.name}
          order={category.order}
          len={categories.length}
          id={category.id}
          selected={categoryIdParam === category.id}
        />
      ))}
    </div>
  );
};

export default Categories;
