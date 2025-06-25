import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { UsersParams } from '@/app/actions/getUsers';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Input,
  Button,
  Select,
  Option,
  FormControl,
  FormLabel,
} from '@mui/joy';

interface UserListFilterProps {
  searchParams: UsersParams;
}

const UserListFilter = ({ searchParams }: UserListFilterProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      ...searchParams,
      active:
        searchParams.active !== undefined ? String(searchParams.active) : '',
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
          <FormLabel>이름</FormLabel>
          <Input variant="soft" size="sm" {...register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input variant="soft" size="sm" {...register('email')} />
        </FormControl>
        <FormControl>
          <FormLabel>구분</FormLabel>
          <Controller
            name="userType"
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
                <Option value="Admin">관리자</Option>
                <Option value="User">일반</Option>
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>활성화 여부</FormLabel>
          <Controller
            name="active"
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

export default UserListFilter;
