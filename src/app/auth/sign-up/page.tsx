'use client';

import Input from '@/components/Input';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      await axios.post('/api/sign-up', body);
      router.push('/auth/sign-in');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid h-dvh place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 min-w-[350px]"
      >
        <h1 className="text-2xl text-center">
          <span className="font-semibold">2nd</span>
          <span className="text-cyan-500 font-bold">HAND</span>
        </h1>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="passwordConfirm"
          label="Password Confirm"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button label="회원가입" />
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            계정이 있으신가요?&nbsp;
            <Link href="/auth/sign-in" className="text-black hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
