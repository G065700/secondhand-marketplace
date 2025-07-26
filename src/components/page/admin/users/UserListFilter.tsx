import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UsersParams } from '@/app/actions/getUsers';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/joy';
import SmallInput from '@/components/shared/input/SmallInput';
import SmallSelect from '@/components/shared/select/SmallSelect';
import SmallButton from '@/components/shared/button/SmallButton';
import SelectOption from '@/components/shared/select/SelectOption';

interface UserListFilterProps {
  searchParams: UsersParams;
}

const UserListFilter = ({ searchParams }: UserListFilterProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: searchParams.name || '',
      email: searchParams.email || '',
      userType: searchParams.userType || '',
      active:
        searchParams.active !== undefined ? String(searchParams.active) : '',
    }),
    [searchParams],
  );

  const { control, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (body) => {
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
    },
    [router],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between text-sm"
    >
      <Box display="flex" gap={2}>
        <SmallInput id="name" label="이름" control={control} />
        <SmallInput id="email" label="이메일" control={control} />

        <SmallSelect id="userType" label="구분" control={control}>
          <SelectOption value="">전체</SelectOption>
          <SelectOption value="Admin">관리자</SelectOption>
          <SelectOption value="User">일반</SelectOption>
        </SmallSelect>

        <SmallSelect id="active" label="활성화 여부" control={control}>
          <SelectOption value="">전체</SelectOption>
          <SelectOption value="true">Y</SelectOption>
          <SelectOption value="false">N</SelectOption>
        </SmallSelect>
      </Box>

      <SmallButton disabled={isSubmitting}>검색</SmallButton>
    </form>
  );
};

export default UserListFilter;
