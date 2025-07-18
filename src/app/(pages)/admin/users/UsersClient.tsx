'use client';

import { User } from '@/prisma/client';
import UserListFilter from '@/components/page/admin/users/UserListFilter';
import UserListTable from '@/components/page/admin/users/UserListTable';
import { UsersParams } from '@/app/actions/getUsers';
import UserListSummary from '@/components/page/admin/users/UserListSummary';
import { Box, Divider } from '@mui/joy';

interface UsersClientProps {
  users: {
    data: User[];
    totalItems: number;
  };
  searchParams: UsersParams;
}

const UsersClient = ({ users, searchParams }: UsersClientProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <Divider />
      <UserListFilter searchParams={searchParams} />
      <Divider />
      <UserListSummary
        searchParams={searchParams}
        totalItems={users.totalItems}
      />
      <UserListTable
        data={users.data}
        totalItems={users.totalItems}
        skip={searchParams.skip}
      />
    </Box>
  );
};

export default UsersClient;
