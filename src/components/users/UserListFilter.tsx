import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UsersParams } from '@/app/actions/getUsers';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserListFilterProps {
  searchParams: UsersParams;
}

const UserListFilter = ({ searchParams }: UserListFilterProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: searchParams,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between text-sm"
    >
      <div className="flex gap-4">
        <div className="flex gap-1">
          <label>이름</label>
          <input
            {...register('name')}
            disabled={isLoading}
            className="border border-neutral-400 w-[120px]"
          />
        </div>
        <div className="flex gap-1">
          <label>이메일</label>
          <input
            {...register('email')}
            disabled={isLoading}
            className="border border-neutral-400"
          />
        </div>
        <div className="flex gap-1">
          <label>구분</label>
          <select
            {...register('userType')}
            disabled={isLoading}
            className="border border-neutral-400"
          >
            <option label="전체" value="" />
            <option label="Admin" value="Admin" />
            <option label="User" value="User" />
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded-lg cursor-pointer"
      >
        검색
      </button>
    </form>
  );
};

export default UserListFilter;
