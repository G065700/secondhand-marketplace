'use client';

import { Category, Product, User } from '@/prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '@/components/HeartButton';
import { fromNow } from '@/helpers/dayjs';
import { Box, Card, Typography } from '@mui/joy';

interface ProductCardProps {
  product: Product;
  category?: Category;
  currentUser?: User | null;
}

const ProductCard = ({ product, category, currentUser }: ProductCardProps) => {
  const router = useRouter();

  console.log(currentUser);

  return (
    <Card
      variant="outlined"
      sx={{ p: 1.5, cursor: 'pointer' }}
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            level="title-md"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {product.title}
          </Typography>
          <Typography level="body-sm">{category?.name}</Typography>
        </Box>

        {currentUser?.userType !== 'Admin' && (
          <Box
            sx={{
              position: 'absolute',
              top: '-22px',
              right: '-20px',
            }}
          >
            <HeartButton productId={product.id} currentUser={currentUser} />
          </Box>
        )}

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            aspectRatio: '1 / 1',
            borderRadius: 'xl',
          }}
        >
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="auto"
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <div>
            <Typography level="body-xs">
              {fromNow(product.createdAt)}
            </Typography>
            <Typography level="body-sm">
              {product.price.toLocaleString()}&nbsp;
              <span className="font-light">원</span>
            </Typography>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
