import Link from 'next/link';

interface CategoryBoxProps {
  label: string;
  id: string;
  // icon: IconType;
  selected?: boolean;
}

const CategoryBox = ({
  label,
  id,
  // icon: Icon,
  selected,
}: CategoryBoxProps) => {
  return (
    <Link
      href={`?categoryId=${id}`}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      {/*<Icon size={26} />*/}
      <div>{label}</div>
    </Link>
  );
};

export default CategoryBox;
