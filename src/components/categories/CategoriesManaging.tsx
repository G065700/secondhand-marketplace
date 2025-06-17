'use client';

import { Category } from '@/prisma/client';
import { useState, useMemo } from 'react';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoriesManaging = ({ categories }: { categories: Category[] }) => {
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

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const orders: number[] = data.categories.map((category: FieldValues) =>
        Number(category.order),
      );

      const sortedOrders = orders.sort(function (a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
      });

      sortedOrders.forEach((sortedOrder, idx) => {
        if (sortedOrder !== idx + 1) {
          toast.error(`순서: 1부터 차례대로 숫자를 입력해 주세요.`);
          throw new Error();
        }
      });

      await axios.post('/api/categories', data.categories);
      toast.success('저장되었습니다.');
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
    <>
      <div className="h-8 flex justify-between">
        <button
          className="text-white text-sm bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => {
            prepend(initializedCategory);
          }}
        >
          카테고리 추가
        </button>
        <button
          className="text-white text-sm bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          저장
        </button>
      </div>
      <div className="mt-2">
        <p>
          <span className="inline-block w-[100px] bg-black text-white text-center p-2">
            순서
          </span>
          <span className="inline-block w-[calc(100%_-_100px)] bg-black text-white p-2 pl-4">
            카테고리
          </span>
        </p>
        <div className="max-h-[calc(100dvh_-_185px)] overflow-y-scroll flex flex-col gap-3 py-3">
          {fields.map((category, idx) => (
            <div key={category.id} className="flex gap-2">
              <CategoryManagingInput
                id={`categories.${idx}.order`}
                type="number"
                label="노출 순서"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <CategoryManagingInput
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
                className="text-white text-sm bg-rose-400 hover:bg-rose-500 px-2 py-1 rounded-lg cursor-pointer"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const regExps: { [p: string]: RegExp } = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

interface CategoryManagingInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const CategoryManagingInput = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  required,
  errors,
}: CategoryManagingInputProps) => {
  return (
    <input
      id={id}
      disabled={disabled}
      {...register(id, {
        required: required && `${label}은 필수 입력 항목입니다.`,
        pattern: {
          value: regExps[id],
          message: `${label} 형식으로 입력해 주세요.`,
        },
        validate: (value, formValues) => {
          if (id === 'passwordConfirm' && formValues.password !== value) {
            return 'Password 와 Password Confirm 이 일치하지 않습니다.';
          }
        },
      })}
      placeholder=""
      type={type}
      className={`
          ${type === 'number' ? 'w-[100px]' : 'flex-1'}
          p-2
          font-light
          border
          bg-white
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-orange-400' : 'border-neutral-400'}
        `}
    />
  );
};

export default CategoriesManaging;
