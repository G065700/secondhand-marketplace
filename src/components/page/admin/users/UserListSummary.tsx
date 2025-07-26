import { UsersParams } from '@/app/actions/getUsers';
import { COUNT_PER_PAGE } from '@/constants';
import { useRouter } from 'next/navigation';
import { Select, Typography, Box } from '@mui/joy';
import SelectOption from '@/components/shared/select/SelectOption';
import { useCallback } from 'react';

interface UserListSummaryProps {
  searchParams: UsersParams;
  totalItems: number;
}

const UserListSummary = ({
  searchParams,
  totalItems,
}: UserListSummaryProps) => {
  const router = useRouter();

  const handleUsersPerPage = useCallback(
    (usersPerPage: number) => {
      const queryStrArr: string[] = [];

      const sp: UsersParams & { [key: string]: any } = {
        ...searchParams,
        page: 1,
        skip: 0,
        take: usersPerPage,
      };

      Object.keys(sp).forEach((key) => {
        queryStrArr.push(`${key}=${sp[key]}`);
      });

      router.push(`?${queryStrArr.join('&')}`);
    },
    [router, searchParams],
  );

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Select
        variant="soft"
        size="sm"
        sx={{ boxShadow: 'none' }}
        slotProps={{
          listbox: {
            sx: {
              boxShadow: 'none',
            },
          },
        }}
        value={searchParams.take || COUNT_PER_PAGE[0]}
        onChange={(_, value) => {
          if (value) {
            handleUsersPerPage(value);
          }
        }}
      >
        {COUNT_PER_PAGE.map((size) => (
          <SelectOption key={size} value={size}>
            {`${size}개씩 보기`}
          </SelectOption>
        ))}
      </Select>

      <Typography level="body-sm">
        총 <strong>{totalItems}</strong> 건
      </Typography>
    </Box>
  );
};

export default UserListSummary;
