import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface CategoryBoxProps {
  label: string;
  order: number;
  len: number;
  id: string;
  selected?: boolean;
}

const LG = 1025;
const MD = 768;
const SM = 640;

const CategoryBox = ({ label, order, len, id, selected }: CategoryBoxProps) => {
  const [colCnt, setColCnt] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        if (window.innerWidth >= LG) {
          setColCnt(7);
        } else if (window.innerWidth >= MD) {
          setColCnt(6);
        } else if (window.innerWidth >= SM) {
          setColCnt(5);
        } else {
          setColCnt(3);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const rowCnt = useMemo(
    () => (colCnt >= len ? 1 : Math.floor(len / colCnt) + 1),
    [len, colCnt],
  );

  return (
    <Link
      href={`?categoryId=${id}`}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center
        gap-2
        py-2
        border-neutral-300
        transition
        hover:font-semibold
        ${order % colCnt === 0 ? 'border-r-0' : 'border-r'}
        ${(Math.floor(order / colCnt) === rowCnt - 1 && order % colCnt !== 0) || rowCnt === 1 ? 'border-b-0' : 'border-b'}
        ${selected ? 'bg-cyan-600' : 'bg-white'}
        ${selected ? 'text-white' : 'text-neutral-500'}
      `}
    >
      <div>{label}</div>
    </Link>
  );
};

export default CategoryBox;
