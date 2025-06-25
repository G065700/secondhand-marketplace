'use client';

import Heading from '@/components/Heading';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/joy';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = '일치하는 데이터가 없습니다.',
  subtitle = '일부 필터를 변경하거나 제거해 보십시오.',
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Heading title={title} subtitle={subtitle} />
      {showReset && (
        <Button size="lg" sx={{ mt: 2 }} onClick={() => router.push('/')}>
          모든 필터 제거
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
