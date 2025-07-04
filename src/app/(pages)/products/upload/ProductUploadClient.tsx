'use client';

import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import CategoryInput from '@/components/categories/CategoryInput';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Category } from '@/prisma/client';
import Textarea from '@/components/Textarea';

interface ProductUploadClientProps {
  categories: Category[];
}

const ProductUploadClient = ({ categories }: ProductUploadClientProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
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

  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
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

      <Button label="상품 생성하기" />
    </form>
  );
};

export default ProductUploadClient;
