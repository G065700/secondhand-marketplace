import { formatTime } from '@/helpers/dayjs';
import { Typography } from '@mui/joy';

interface CategoriesOriginHeaderProps {
  updatedAt: Date;
}

const CategoriesOriginHeader = ({ updatedAt }: CategoriesOriginHeaderProps) => {
  return (
    <Typography>
      최신수정일&nbsp;
      <Typography fontWeight="bold">{formatTime(updatedAt)}</Typography>
    </Typography>
  );
};

export default CategoriesOriginHeader;
