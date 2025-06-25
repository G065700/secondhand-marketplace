import { UsersParams } from '@/app/actions/getUsers';
import { USERS_PER_PAGE } from '@/constants';
import { useRouter } from 'next/navigation';
import { Select, Option, Typography } from '@mui/joy';

interface UserListSummaryProps {
  searchParams: UsersParams;
  totalItems: number;
}

const UserListSummary = ({
  searchParams,
  totalItems,
}: UserListSummaryProps) => {
  const router = useRouter();

  const handleUsersPerPage = (usersPerPage: number) => {
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
  };

  return (
    <div className="flex justify-between items-center">
      <Select
        variant="soft"
        size="sm"
        value={searchParams.take || USERS_PER_PAGE[0]}
        onChange={(_, value) => {
          if (value) {
            handleUsersPerPage(value);
          }
        }}
      >
        {USERS_PER_PAGE.map((size) => (
          <Option key={size} value={size}>{`${size}개씩 보기`}</Option>
        ))}
      </Select>

      <Typography level="body-sm">
        총 <strong>{totalItems}</strong> 건
      </Typography>
    </div>
  );
};

export default UserListSummary;
