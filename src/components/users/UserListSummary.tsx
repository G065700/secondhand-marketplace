import { UsersParams } from '@/app/actions/getUsers';
import { USERS_PER_PAGE } from '@/constants';
import { useRouter } from 'next/navigation';

interface UserListSummaryProps {
  searchParams: UsersParams;
  totalItems: number;
}

const UserListSummary = ({
  searchParams,
  totalItems,
}: UserListSummaryProps) => {
  const router = useRouter();

  const handleUsersPerPage = (usersPerPage: string) => {
    const queryStrArr: string[] = [];

    const sp: UsersParams & { [key: string]: any } = {
      ...searchParams,
      page: 1,
      skip: 0,
      take: Number(usersPerPage),
    };

    Object.keys(sp).forEach((key) => {
      queryStrArr.push(`${key}=${sp[key]}`);
    });

    router.push(`?${queryStrArr.join('&')}`);
  };

  return (
    <div className="flex justify-between mt-5">
      <select
        value={searchParams.take || USERS_PER_PAGE[0]}
        onChange={(e) => {
          handleUsersPerPage(e.target.value);
        }}
        className="border border-neutral-400"
      >
        {USERS_PER_PAGE.map((size) => (
          <option key={size} label={`${size}개씩 보기`} value={size} />
        ))}
      </select>
      <span>
        총 <strong>{totalItems}</strong> 건
      </span>
    </div>
  );
};

export default UserListSummary;
