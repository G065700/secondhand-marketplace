import Container from '@/components/Container';
import getUsers, { UsersParams } from '@/app/actions/getUsers';
import UsersClient from '@/app/(pages)/admin/users/UsersClient';
import Pagination from '@/components/pagination/Pagination';
import { USERS_PER_PAGE } from '@/constants';

interface UsersPageProps {
  searchParams: UsersParams;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const sp = await searchParams;

  const pageNum = sp.page ? Number(sp.page) : 1;
  const skipNum = sp.skip ? Number(sp.skip) : 0;
  const takeNum = sp.take ? Number(sp.take) : USERS_PER_PAGE[0];

  const users = await getUsers(sp);

  return (
    <Container>
      <UsersClient
        users={users}
        searchParams={{ ...sp, page: pageNum, skip: skipNum, take: takeNum }}
      />
      <Pagination
        page={pageNum}
        itemsPerPage={takeNum}
        totalItems={users.totalItems}
      />
    </Container>
  );
};

export default UsersPage;
