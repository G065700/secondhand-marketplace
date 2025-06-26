import { ReactNode } from 'react';
import { Box, Typography } from '@mui/joy';

interface HeadingProps {
  title: ReactNode;
  subtitle?: string;
}

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <Box>
      <Typography level="h4">{title}</Typography>
      <Typography level="body-md">{subtitle}</Typography>
    </Box>
  );
};

export default Heading;
