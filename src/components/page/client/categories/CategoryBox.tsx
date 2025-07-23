import Link from 'next/link';
import { Grid, Typography } from '@mui/joy';

interface CategoryBoxProps {
  label: string;
  id: string;
  selected?: boolean;
}

const CategoryBox = ({ label, id, selected }: CategoryBoxProps) => {
  const href = id ? `?categoryId=${id}` : '/';

  return (
    <Grid bgcolor={selected ? 'black' : 'transparent'} borderRadius="md" p={1}>
      <Link href={href}>
        <Typography
          level="body-sm"
          sx={{ color: selected ? 'white' : 'black' }}
        >
          {label}
        </Typography>
      </Link>
    </Grid>
  );
};

export default CategoryBox;
