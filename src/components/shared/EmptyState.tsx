'use client';

import { useRouter } from 'next/navigation';
import LargeButton from '@/components/shared/button/LargeButton';
import { Box, Typography } from '@mui/joy';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  height?: string;
}

const EmptyState = ({
  title = '일치하는 데이터가 없습니다.',
  subtitle = '일부 필터를 변경하거나 제거해 보십시오.',
  showReset,
  height = '60vh',
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: height === 'full' ? '100vh' : height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box>
        <Typography level="h4" textAlign="center">
          {title}
        </Typography>
        <Typography level="body-md">{subtitle}</Typography>
      </Box>
      {showReset && (
        <LargeButton sx={{ mt: 2 }} onClick={() => router.push('/')}>
          모든 필터 제거
        </LargeButton>
      )}
    </Box>
  );
};

export default EmptyState;
