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

interface ProductUploadClientProps {
  categories: Category[];
}

const ProductUploadClient = ({ categories }: ProductUploadClientProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    axios
      .post('/api/products', data)
      .then((response) => {
        router.push(`/products/${response.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Heading title="Product Upload" subtitle="upload your product" />

      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
      <Input
        id="title"
        label="TItle"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <hr />
      <Input
        id="description"
        label="Description"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <hr />
      <Input
        id="price"
        label="Price"
        formatPrice
        required
        disabled={isLoading}
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
