'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Category, Product, User } from '@/prisma/client';
import dynamic from 'next/dynamic';
import Heading from '@/components/shared/Heading';
const ImageUpload = dynamic(() => import('@/components/shared/ImageUpload'), {
  ssr: false,
});
import LargeTextarea from '@/components/shared/textarea/LargeTextarea';
import CategoryInput from '@/components/page/client/categories/CategoryInput';
import { Box, Checkbox, FormControl, FormLabel } from '@mui/joy';
import axios from 'axios';
import { toast } from 'react-toastify';
import LargeInput from '@/components/shared/input/LargeInput';
import LargeButton from '@/components/shared/button/LargeButton';

interface ProductUpdateClientProps {
  product: Product & { category: Category; user: User };
  categories: Category[];
}

const ProductUpdateClient = ({
  product,
  categories,
}: ProductUpdateClientProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(() => product, [product]);

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<FieldValues>({
      defaultValues,
    });

  const imageSrc = watch('imageSrc');
  const categoryId = watch('categoryId');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (body) => {
      setIsSubmitting(true);
      try {
        await axios.patch('/api/products', {
          ...body,
          price: Number(body.price),
        });
        router.push('/histories');
        toast.success('저장되었습니다.');
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value);
    },
    [setValue],
  );

  const KakaoMap = dynamic(() => import('@/components/shared/KakaoMap'), {
    ssr: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Heading title="상품 수정" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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

      <Box display="flex" flexDirection="column" gap={1}>
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

      <FormControl>
        <FormLabel>판매 완료 여부</FormLabel>

        <Controller
          name="soldOut"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              label="판매 완료"
            />
          )}
        />
      </FormControl>
      <LargeButton>상품 수정하기</LargeButton>
    </form>
  );
};

export default ProductUpdateClient;
