import { Box, Typography } from '@mui/joy';

interface ProductCategoryAndPriceInfoProps {
  category: string;
  price: number;
}

const ProductCategoryAndPriceInfo = ({
  category,
  price,
}: ProductCategoryAndPriceInfoProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography level="body-lg">{price.toLocaleString()} 원</Typography>
      <Typography level="body-sm">{category}</Typography>
    </Box>
  );
};

export default ProductCategoryAndPriceInfo;
