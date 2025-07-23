'use client';

import usePagination from '@lucasmogari/react-pagination';
import PaginationLink from '@/components/shared/pagination/PaginationLink';
import { Box } from '@mui/joy';

interface PaginationProps {
  skip: number;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination = ({ skip, itemsPerPage, totalItems }: PaginationProps) => {
  const page = skip ? skip / itemsPerPage + 1 : 1;

  const { getPageItem, totalPages } = usePagination({
    totalItems,
    page,
    itemsPerPage,
    maxPageItems: 5,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);

  const arr = new Array(totalPages + 2);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mt={2}
    >
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);

        if (page === 'previous') {
          return (
            <PaginationLink
              key={i}
              page={prevPage}
              itemsPerPage={itemsPerPage}
              disabled={disabled}
            >
              {'<'}
            </PaginationLink>
          );
        }

        if (page === 'next') {
          return (
            <PaginationLink
              key={i}
              page={nextPage}
              itemsPerPage={itemsPerPage}
              disabled={disabled}
            >
              {'>'}
            </PaginationLink>
          );
        }

        if (page === 'gap') {
          return <span key={i}>...</span>;
        }

        return (
          <PaginationLink
            key={i}
            active={current}
            page={page}
            itemsPerPage={itemsPerPage}
          >
            {page}
          </PaginationLink>
        );
      })}
    </Box>
  );
};

export default Pagination;
