import { ReactNode } from 'react';
import { Box } from '@mui/joy';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Box
      sx={{
        maxWidth: '2520px',
        pt: 10,
        pb: 3,
        px: {
          xs: 2.5,
          sm: 5,
          md: 10,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
