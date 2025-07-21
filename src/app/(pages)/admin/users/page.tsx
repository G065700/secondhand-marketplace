import Container from '@/components/shared/layout/Container';
import getUsers, { UsersParams } from '@/app/actions/getUsers';
import UsersClient from '@/app/(pages)/admin/users/UsersClient';
import Pagination from '@/components/shared/pagination/Pagination';
import { COUNT_PER_PAGE } from '@/constants';

interface UsersPageProps {
  searchParams: Promise<UsersPageSearchParams>;
}

type UsersPageSearchParams = Omit<UsersParams, 'active'> & {
  active?: string;
};

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const sp = await searchParams;

  const active = sp.active ? sp.active === 'true' : undefined;
  const skipNum = sp.skip ? Number(sp.skip) : 0;
  const takeNum = sp.take ? Number(sp.take) : COUNT_PER_PAGE[0];

  const spProps = {
    ...sp,
    active,
    skip: skipNum,
    take: takeNum,
  };

  const users = await getUsers(spProps);

  return (
    <Container>
      <UsersClient users={users} searchParams={spProps} />
      <Pagination
        skip={skipNum}
        itemsPerPage={takeNum}
        totalItems={users.totalItems}
      />
    </Container>
  );
};

export default UsersPage;
