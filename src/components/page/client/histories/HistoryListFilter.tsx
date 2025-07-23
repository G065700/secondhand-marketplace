import { Category } from '@/prisma/client';
import { ProductsParams } from '@/app/actions/getProducts';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SmallInput from '@/components/shared/input/SmallInput';
import SmallSelect from '@/components/shared/select/SmallSelect';
import SmallButton from '@/components/shared/button/SmallButton';
import SelectOption from '@/components/shared/select/SelectOption';
import { Box } from '@mui/joy';

interface HistoryListFilterProps {
  categories: Category[];
  searchParams: ProductsParams;
}

const HistoryListFilter = ({
  categories,
  searchParams,
}: HistoryListFilterProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      title: searchParams.title || '',
      categoryId: searchParams.categoryId || '',
      soldOut:
        searchParams.soldOut !== undefined ? String(searchParams.soldOut) : '',
      suspension:
        searchParams.suspension !== undefined
          ? String(searchParams.suspension)
          : '',
    }),
    [searchParams],
  );

  const { control, reset, handleSubmit } = useForm<FieldValues>({
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

      router.push('?' + queryStrArr.join('&'));
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
      <Box display="flex" gap={2}>
        <SmallInput id="title" label="상품명" control={control} />

        <SmallSelect id="categoryId" label="카테고리" control={control}>
          <SelectOption value="">전체</SelectOption>
          {categories.map((category) => (
            <SelectOption key={category.id} value={category.id}>
              {category.name}
            </SelectOption>
          ))}
        </SmallSelect>

        <SmallSelect id="soldOut" label="판매 완료" control={control}>
          <SelectOption value="">전체</SelectOption>
          <SelectOption value="true">Y</SelectOption>
          <SelectOption value="false">N</SelectOption>
        </SmallSelect>

        <SmallSelect id="suspension" label="판매 중지" control={control}>
          <SelectOption value="">전체</SelectOption>
          <SelectOption value="true">Y</SelectOption>
          <SelectOption value="false">N</SelectOption>
        </SmallSelect>
      </Box>

      <SmallButton disabled={isSubmitting}>검색</SmallButton>
    </form>
  );
};

export default HistoryListFilter;
