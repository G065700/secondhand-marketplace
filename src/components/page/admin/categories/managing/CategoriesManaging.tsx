'use client';

import { Category } from '@/prisma/client';
import { useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/joy';
import CategoriesManagingHeader from '@/components/page/admin/categories/managing/CategoriesManagingHeader';
import CategoriesManagingTable from '@/components/page/admin/categories/managing/CategoriesManagingTable';

const CategoriesManaging = ({ categories }: { categories: Category[] }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      categories: categories.map((category) => ({
        id: category.id,
        order: category.order,
        name: category.name,
      })),
    },
  });

  const fieldArray = useFieldArray({
    control,
    name: 'categories',
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);

    const { categories } = data;

    try {
      const orders: number[] = categories.map((category: FieldValues) =>
        Number(category.order),
      );

      const sortedOrders = orders.sort(function (a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
      });

      sortedOrders.forEach((sortedOrder, idx) => {
        if (sortedOrder !== idx + 1) {
          toast.error('순서 항목에 1부터 차례대로 숫자를 입력해 주세요.');
          throw new Error();
        }
      });

      categories.forEach(
        (category: { id: string; order: string; name: string }) => {
          if (!category.name.trim()) {
            toast.error('카테고리명은 필수 입력 항목입니다.');
            throw new Error();
          }
        },
      );

      await axios.post('/api/categories', categories);
      toast.success('저장되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box flex={1} display="flex" flexDirection="column" gap={1}>
      <CategoriesManagingHeader
        fieldArray={fieldArray}
        handleCategoriesSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <CategoriesManagingTable
        fieldArray={fieldArray}
        control={control}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default CategoriesManaging;
