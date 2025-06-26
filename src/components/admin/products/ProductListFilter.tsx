import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
} from '@mui/joy';
import { ProductsParams } from '@/app/actions/getProducts';
import { Category } from '@/prisma/client';

interface ProductListFilterProps {
  categories: Category[];
  searchParams: ProductsParams;
}

const ProductListFilter = ({
  categories,
  searchParams,
}: ProductListFilterProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      ...searchParams,
      soldOut:
        searchParams.soldOut !== undefined ? String(searchParams.soldOut) : '',
      suspension:
        searchParams.suspension !== undefined
          ? String(searchParams.suspension)
          : '',
    }),
    [searchParams],
  );

  const { register, control, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      setIsSubmitting(true);

      const queryStrArr: string[] = [];

      Object.keys(body).forEach((value) => {
        if (body[value]) {
          queryStrArr.push(`${value}=${body[value]}`);
        }
      });

      if (queryStrArr.length) {
        router.push('?' + queryStrArr.join('&'));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between text-sm"
    >
      <div className="flex gap-4">
        <FormControl>
          <FormLabel>상품명</FormLabel>
          <Input variant="soft" size="sm" {...register('title')} />
        </FormControl>

        <FormControl>
          <FormLabel>카테고리</FormLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                defaultValue=""
                value={field.value || ''}
                onChange={(_, value) => field.onChange(value)}
                variant="soft"
                size="sm"
              >
                <Option value="">전체</Option>
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>판매 완료</FormLabel>
          <Controller
            name="soldOut"
            control={control}
            render={({ field }) => (
              <Select
                defaultValue=""
                value={field.value || ''}
                onChange={(_, value) => field.onChange(value)}
                variant="soft"
                size="sm"
              >
                <Option value="">전체</Option>
                <Option value="true">Y</Option>
                <Option value="false">N</Option>
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>판매 중지</FormLabel>
          <Controller
            name="suspension"
            control={control}
            render={({ field }) => (
              <Select
                defaultValue=""
                value={field.value || ''}
                onChange={(_, value) => field.onChange(value)}
                variant="soft"
                size="sm"
              >
                <Option value="">전체</Option>
                <Option value="true">Y</Option>
                <Option value="false">N</Option>
              </Select>
            )}
          />
        </FormControl>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        검색
      </Button>
    </form>
  );
};

export default ProductListFilter;
