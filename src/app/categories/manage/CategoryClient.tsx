'use client';

import { Category } from '@/prisma/client';
import Container from '@/components/Container';
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface CategoryClientProps {
  categories: Category[];
}

const CategoryClient = ({ categories }: CategoryClientProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      categories: categories.map((category) => ({
        id: category.id,
        order: category.order,
        name: category.name,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/categories', data.categories);
      toast.success('저장되었습니다.');
      router.push(`/categories`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializedCategory = useMemo(
    () => ({
      name: '',
      order: fields.length + 1,
    }),
    [fields.length],
  );

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <button
          onClick={() => {
            append(initializedCategory);
          }}
          className="bg-red-400 text-white cursor-pointer rounded-lg hover:opacity-80 px-2 py-1"
        >
          카테고리 추가
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {fields.map((category, idx) => (
            <div key={category.id} className="flex gap-2">
              <Input
                id={`categories.${idx}.order`}
                type="number"
                label="노출 순서"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id={`categories.${idx}.name`}
                label="카테고리명"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />

              <button
                disabled={isLoading}
                onClick={() => {
                  remove(idx);
                }}
                className="bg-red-400 text-white cursor-pointer rounded-lg hover:opacity-80 px-2 py-1"
              >
                삭제
              </button>
            </div>
          ))}
          <Button label="저장" />
        </form>
      </div>
    </Container>
  );
};

export default CategoryClient;
