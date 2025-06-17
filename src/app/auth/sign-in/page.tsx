'use client';

import Input from '@/components/Input';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      await signIn('credentials', body);
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
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button label="로그인" />
        <div className="text-center text-sm">
          <p className="text-gray-400">
            계정이 없으신가요??&nbsp;
            <Link href="/auth/sign-up" className="text-black hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
