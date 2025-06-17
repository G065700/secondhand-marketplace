'use client';

import { useSearchParams } from 'next/navigation';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { PropsWithChildren } from 'react';
import qs from 'query-string';
import Link from 'next/link';

type PaginationLinkProps = {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
} & PropsWithChildren;

const PaginationLink = ({
  page,
  active,
  disabled,
  children,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const skip = page ? (Number(page) - 1) * PRODUCTS_PER_PAGE : 0;

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery = {
    ...currentQuery,
    page,
    skip,
  };

  return (
    <Link
      href={{ query: updatedQuery }}
      className={`
        p-2 
        text-base
        ${active ? 'font-bold text-cyan-500' : 'text-gray-500'}
        ${disabled ? 'pointer-events-none text-gray-200' : ''}
      `}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
