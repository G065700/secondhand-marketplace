import Container from '@/components/shared/layout/Container';
import EmptyState from '@/components/shared/EmptyState';

const NotFound = () => {
  return (
    <Container>
      <EmptyState
        height="calc(100vh - 104px)"
        title="해당 사용자가 존재하지 않습니다."
        subtitle=""
      />
    </Container>
  );
};

export default NotFound;
