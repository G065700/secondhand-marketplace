import { formatTime } from '@/helpers/dayjs';
import { Typography } from '@mui/joy';
import { memo } from 'react';

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

export default memo(CategoriesOriginHeader);
