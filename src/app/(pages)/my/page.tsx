import Container from '@/components/shared/layout/Container';
import MyClient from '@/app/(pages)/my/MyClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { notFound } from 'next/navigation';

const MyPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return notFound();
  }

  return (
    <Container>
      <MyClient currentUser={currentUser} />
    </Container>
  );
};

export default MyPage;
