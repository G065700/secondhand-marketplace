import { User } from '@/prisma/client';
import { IconType } from 'react-icons';
import Avatar from '@/components/Avatar';
import ProductCategory from '@/components/products/ProductCategory';
import { formatTime } from '@/helpers/dayjs';

interface ProductInfoProps {
  user: User;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  description: string;
  createdAt: Date;
}

const ProductInfo = ({
  user,
  category,
  description,
  createdAt,
}: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Avatar src={user.image} />
          <p>{user.name}</p>
        </div>
        <div>{formatTime(createdAt)}</div>
      </div>
      <hr />

      {category && (
        <ProductCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />

      <div>{description}</div>
    </div>
  );
};

export default ProductInfo;
