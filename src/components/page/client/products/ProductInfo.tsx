import { Category, User } from '@/prisma/client';
import Avatar from '@/components/shared/Avatar';
import ProductCategoryAndPriceInfo from '@/components/page/client/products/ProductCategoryAndPriceInfo';
import { formatTime } from '@/helpers/dayjs';
import { Box, Divider, Typography } from '@mui/joy';
import { memo } from 'react';

interface ProductInfoProps {
  user: User;
  category: Category;
  price: number;
  description: string;
  createdAt: Date;
}

const ProductInfo = ({
  user,
  category,
  price,
  description,
  createdAt,
}: ProductInfoProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="xl"
          fontWeight="lg"
        >
          <Avatar src={user.image} />
          <Typography level="title-md">{user.name}</Typography>
        </Box>
        <Typography level="body-md">{formatTime(createdAt)}</Typography>
      </Box>
      <Divider />

      <ProductCategoryAndPriceInfo category={category.name} price={price} />
      <Divider />

      <Typography whiteSpace="pre-line" maxHeight={170} overflow="auto">
        {description}
      </Typography>
    </Box>
  );
};

export default memo(ProductInfo);
