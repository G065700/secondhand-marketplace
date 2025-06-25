'use client';

import { User } from '@/prisma/client';
import UserListFilter from '@/components/admin/users/UserListFilter';
import UserList from '@/components/admin/users/UserList';
import { UsersParams } from '@/app/actions/getUsers';
import UserListSummary from '@/components/admin/users/UserListSummary';
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <Divider />
      <UserListFilter searchParams={searchParams} />
      <Divider />
      <UserListSummary
        searchParams={searchParams}
        totalItems={users.totalItems}
      />
      <UserList
        data={users.data}
        totalItems={users.totalItems}
        skip={searchParams.skip}
      />
    </Box>
  );
};

export default UsersClient;
