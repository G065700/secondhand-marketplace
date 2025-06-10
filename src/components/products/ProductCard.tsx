'use client';

import { Category, Product, User } from '@/prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '@/components/HeartButton';
import { fromNow } from '@/helpers/dayjs';

interface ProductCardProps {
  product: Product;
  category?: Category;
  currentUser?: User | null;
}

const ProductCard = ({ product, category, currentUser }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="auto"
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton productId={product.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">{product.title}</div>
        <div className="font-light text-neutral-500">{category?.name}</div>
        <div className="flex justify-between items-center gap-1">
          <div>
            {product.price.toLocaleString()}&nbsp;
            <span className="font-light">원</span>
          </div>
          <div>{fromNow(product.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
