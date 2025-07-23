'use client';

import Heading from '@/components/shared/Heading';
import ImageUpload from '@/components/shared/ImageUpload';
import CategoryInput from '@/components/page/client/categories/CategoryInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Category } from '@/prisma/client';
import LargeTextarea from '@/components/shared/textarea/LargeTextarea';
import LargeInput from '@/components/shared/input/LargeInput';
import { Box, FormLabel } from '@mui/joy';
import LargeButton from '@/components/shared/button/LargeButton';

interface ProductUploadClientProps {
  categories: Category[];
}

const ProductUploadClient = ({ categories }: ProductUploadClientProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1,
    },
  });

  const imageSrc = watch('imageSrc');
  const categoryId = watch('categoryId');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const KakaoMap = dynamic(() => import('@/components/shared/KakaoMap'), {
    ssr: false,
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsSubmitting(true);

    axios
      .post('/api/products', data)
      .then((response) => {
        router.push(`/products/${response.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Heading
        title="상품 등록"
        subtitle="판매하고 싶은 상품을 등록해보세요!"
      />
      <Box display="flex" flexDirection="column" gap={1}>
        <FormLabel>
          상품 이미지<span className="text-red-500">*</span>
        </FormLabel>
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </Box>

      <LargeInput
        id="title"
        label="상품명"
        required
        asterisk
        disabled={isSubmitting}
        control={control}
      />

      <LargeTextarea
        id="description"
        label="설명"
        required
        asterisk
        disabled={isSubmitting}
        control={control}
      />

      <LargeInput
        id="price"
        label="가격"
        type="number"
        required
        asterisk
        disabled={isSubmitting}
        control={control}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <FormLabel>
          카테고리<span className="text-red-500">*</span>
        </FormLabel>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={1.5}
          maxHeight="50vh"
          overflow="auto"
        >
          {categories.map((item) => (
            <Box key={item.id} gridColumn="span 1">
              <CategoryInput
                onClick={(value) => setCustomValue('categoryId', value)}
                selected={categoryId === item.id}
                label={item.name}
                id={item.id}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={1}>
        <FormLabel>
          위치<span className="text-red-500">*</span>
        </FormLabel>
        <KakaoMap
          setCustomValue={setCustomValue}
          latitude={latitude}
          longitude={longitude}
        />
      </Box>
      <LargeButton>상품 생성하기</LargeButton>
    </form>
  );
};

export default ProductUploadClient;
