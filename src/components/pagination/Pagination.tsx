'use client';

import usePagination from '@lucasmogari/react-pagination';
import { PRODUCTS_PER_PAGE } from '@/constants';
import PaginationLink from '@/components/pagination/PaginationLink';

interface PaginationProps {
  page: number;
  totalItems: number;
}

const Pagination = ({ page, totalItems }: PaginationProps) => {
  const { getPageItem, totalPages } = usePagination({
    totalItems,
    page,
    itemsPerPage: PRODUCTS_PER_PAGE,
    maxPageItems: 5,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);

  const arr = new Array(totalPages + 2);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);

        if (page === 'previous') {
          return (
            <PaginationLink key={i} page={prevPage} disabled={disabled}>
              {'<'}
            </PaginationLink>
          );
        }

        if (page === 'next') {
          return (
            <PaginationLink key={i} page={nextPage} disabled={disabled}>
              {'>'}
            </PaginationLink>
          );
        }

        if (page === 'gap') {
          return <span key={i}>...</span>;
        }

        return (
          <PaginationLink key={i} active={current} page={page}>
            {page}
          </PaginationLink>
        );
      })}
    </div>
  );
};

export default Pagination;
