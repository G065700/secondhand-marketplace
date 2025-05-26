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
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 min-w-[350px]"
      >
        <h1 className="text-2xl text-center">Sign in</h1>
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
        <Button label="Sign in" />
        <div className="text-center">
          <p className="text-gray-400">
            Not a member?&nbsp;
            <Link href="/auth/sign-up" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
