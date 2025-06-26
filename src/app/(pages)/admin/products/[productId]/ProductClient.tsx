'use client';

import { Category, Product, User } from '@/prisma/client';
import { useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Button,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/joy';
import ProductHead from '@/components/products/ProductHead';
import ProductInfo from '@/components/products/ProductInfo';
import dynamic from 'next/dynamic';

interface ProductClientProps {
  product: Product & { category: Category; user: User };
  currentUser?: User | null;
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      suspension: product.suspension,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      await axios.patch('/api/admin/products/suspension', {
        id: product.id,
        suspension: body.suspension === 'true',
      });
      toast.success('저징되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
    ssr: false,
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <Divider />
        <FormControl>
          <Typography level="title-md">
            판매 중지
            <Button
              size="sm"
              sx={{ ml: 1 }}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              저장
            </Button>
          </Typography>

          <Controller
            name="suspension"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                orientation="horizontal"
              >
                <Radio
                  value="true"
                  label="Y"
                  variant="outlined"
                  color="primary"
                />
                <Radio
                  value="false"
                  label="N"
                  variant="outlined"
                  color="primary"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <Divider />
        <ProductHead
          title={product.title}
          imageSrc={product.imageSrc}
          id={product.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10">
          <ProductInfo
            user={product.user}
            category={product.category}
            description={product.description}
            createdAt={product.createdAt}
          />
          <div>
            <KakaoMap
              isDetailPage
              latitude={product.latitude}
              longitude={product.longitude}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
