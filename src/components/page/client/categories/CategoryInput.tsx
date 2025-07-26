import { Box, Typography } from '@mui/joy';
import { memo } from 'react';

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  id: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  label,
  selected,
  id,
  onClick,
}: CategoryInputProps) => {
  return (
    <Box
      onClick={() => onClick(id)}
      sx={{
        borderRadius: 'xl',
        border: '1.5px solid',
        borderColor: selected
          ? 'var(--color-cyan-500)'
          : 'color-mix(in srgb, var(--color-gray-500), transparent 50%)',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'var(--color-cyan-500)',
        },
      }}
    >
      <Typography level="body-md" fontWeight="lg">
        {label}
      </Typography>
    </Box>
  );
};

export default memo(CategoryInput);
