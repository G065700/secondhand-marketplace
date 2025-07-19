import Container from '@/components/shared/layout/Container';
import UserClient from '@/app/(pages)/admin/users/[userId]/UserClient';
import getUserById from '@/app/actions/getUserById';

interface Params {
  userId?: string;
}

const UserPage = async ({ params }: { params: Params }) => {
  const user = await getUserById(params);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <UserClient user={user} />
    </Container>
  );
};

export default UserPage;
