'use client';

import { User } from '@/prisma/client';
import UserListFilter from '@/components/users/UserListFilter';
import UserList from '@/components/users/UserList';
import { UsersParams } from '@/app/actions/getUsers';
import UserListSummary from '@/components/users/UserListSummary';

interface UsersClientProps {
  users: {
    data: User[];
    totalItems: number;
  };
  searchParams: UsersParams;
}

const UsersClient = ({ users, searchParams }: UsersClientProps) => {
  return (
    <>
      <UserListFilter searchParams={searchParams} />
      <UserListSummary
        searchParams={searchParams}
        totalItems={users.totalItems}
      />
      <UserList data={users.data} />
    </>
  );
};

export default UsersClient;
