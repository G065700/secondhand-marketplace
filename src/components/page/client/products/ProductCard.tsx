'use client';

import { Category, Product, User } from '@/prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '@/components/shared/button/HeartButton';
import { fromNow } from '@/helpers/dayjs';
import { Box, Card, Typography } from '@mui/joy';
import { memo } from 'react';

interface ProductCardProps {
  product: Product & { category: Category };
  currentUser?: User | null;
}

const ProductCard = ({ product, currentUser }: ProductCardProps) => {
  const router = useRouter();

  const hasUserRole = currentUser && currentUser.userType === 'User';
  const isNotMyProduct = currentUser && currentUser.id !== product.userId;

  const handleProductCardClick = () => router.push(`/products/${product.id}`);

  return (
    <Card
      variant="soft"
      color="neutral"
      sx={{
        p: 1.5,
        cursor: 'pointer',
      }}
      onClick={handleProductCardClick}
    >
      <Box display="flex" flexDirection="column" gap={2} position="relative">
        <Box display="flex" flexDirection="column">
          <Typography
            level="title-md"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {product.title}
          </Typography>
          <Typography level="body-sm">{product.category.name}</Typography>
        </Box>

        {hasUserRole && isNotMyProduct && (
          <Box position="absolute" top={-22} right={-20}>
            <HeartButton productId={product.id} currentUser={currentUser} />
          </Box>
        )}

        <Box
          width="100%"
          position="relative"
          overflow="hidden"
          borderRadius="xl"
          sx={{
            aspectRatio: '1 / 1',
          }}
        >
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="auto"
            className="object-cover w-full h-full"
          />
        </Box>
        <Box mt="auto">
          <Box>
            <Typography level="body-xs">
              {fromNow(product.createdAt)}
            </Typography>
            <Typography level="body-sm">
              {product.price.toLocaleString()}&nbsp;
              <Typography fontWeight="sm">원</Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default memo(ProductCard);
