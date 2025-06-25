import { ReactNode } from 'react';
import { Typography } from '@mui/joy';

interface HeadingProps {
  title: ReactNode;
  subtitle?: string;
}

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <>
      <Typography level="h4">{title}</Typography>
      <Typography level="body-md">{subtitle}</Typography>
    </>
  );
};

export default Heading;
