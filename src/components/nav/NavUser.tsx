import Image from 'next/image';
import { Box } from '@mui/joy';

interface NavUserProps {
  image: string | null;
  name: string | null;
}

const NavUser = ({ image, name }: NavUserProps) => {
  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          sm: 'flex',
        },
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Image
        src={image || '/default-user-image.png'}
        width={30}
        height={30}
        alt={name || ''}
        className="rounded-full"
      />
      <span>{name}</span>
    </Box>
  );
};

export default NavUser;
