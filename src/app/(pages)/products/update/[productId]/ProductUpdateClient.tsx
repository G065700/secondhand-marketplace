'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Category, Product, User } from '@/prisma/client';
import dynamic from 'next/dynamic';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import CategoryInput from '@/components/categories/CategoryInput';
import Button from '@/components/Button';
import { Checkbox, FormControl, Typography } from '@mui/joy';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const imageSrc = watch('imageSrc');
  const categoryId = watch('categoryId');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      await axios.patch('/api/products', {
        ...body,
        price: Number(body.price),
      });
      router.push('/histories');
      toast.success('저징되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
    ssr: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Heading title="상품 수정" />

      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
      <Input
        id="title"
        label="상품명"
        required
        disabled={isSubmitting}
        register={register}
        errors={errors}
      />
      <hr />
      <Textarea
        id="description"
        label="설명"
        required
        disabled={isSubmitting}
        register={register}
        errors={errors}
      />
      <hr />
      <Input
        id="price"
        label="가격"
        formatPrice
        required
        disabled={isSubmitting}
        register={register}
        errors={errors}
      />
      <hr />
      <div
        className="
          grid
          grid-cols-1 md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.id} className="col-span-1">
            <CategoryInput
              onClick={(value) => setCustomValue('categoryId', value)}
              selected={categoryId === item.id}
              label={item.name}
              id={item.id}
            />
          </div>
        ))}
      </div>
      <hr />
      <KakaoMap
        setCustomValue={setCustomValue}
        latitude={latitude}
        longitude={longitude}
      />
      <FormControl>
        <Typography level="title-md">구분</Typography>

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
      <Button label="상품 수정하기" />
    </form>
  );
};

export default ProductUpdateClient;
