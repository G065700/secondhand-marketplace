import Container from '@/components/shared/layout/Container';
import UserClient from '@/app/(pages)/admin/users/[userId]/UserClient';
import getUserById from '@/app/actions/getUserById';
import { notFound } from 'next/navigation';

interface UserPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  return (
    <Container>
      <UserClient user={user} />
    </Container>
  );
};

export default UserPage;
