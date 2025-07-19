'use client';

import { Box, CircularProgress } from '@mui/joy';

const Loader = () => {
  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <CircularProgress variant="soft" />
    </Box>
  );
};

export default Loader;
