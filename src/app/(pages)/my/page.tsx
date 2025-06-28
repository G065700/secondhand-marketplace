import Container from '@/components/Container';
import MyClient from '@/app/(pages)/my/MyClient';
import getCurrentUser from '@/app/actions/getCurrentUser';

const MyPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <>해당 유저 정보가 없습니다.</>;
  }

  return (
    <Container>
      <MyClient currentUser={currentUser} />
    </Container>
  );
};

export default MyPage;
