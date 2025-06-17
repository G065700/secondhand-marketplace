import { Category } from '@/prisma/client';

const CategoriesOrigin = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="max-h-[calc(100dvh_-_185px)] overflow-y-scroll">
      {categories.map((category) => (
        <p key={category.id} className="border-x border-b border-black">
          <span className="inline-block w-[50px] p-2 text-center border-r border-black">
            {category.order}
          </span>
          <span className="inline-block w-[calc(100%_-_50px)] p-2">
            {category.name}
          </span>
        </p>
      ))}
    </div>
  );
};

export default CategoriesOrigin;
