'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Box, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import Logo from '@/components/shared/Logo';
import LargeInput from '@/components/shared/input/LargeInput';
import FormErrorText from '@/components/shared/FormErrorText';
import LargeButton from '@/components/shared/button/LargeButton';

const SignInPage = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { control, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailVal = watch('email');
  const passwordVal = watch('password');

  useEffect(() => {
    setErrorText('');
  }, [emailVal, passwordVal]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (body) => {
      setIsSubmitting(true);
      try {
        const result = await signIn('credentials', {
          email: body.email,
          password: body.password,
          redirect: false,
        });

        if (result) {
          if (result.ok) {
            router.push('/');
          } else {
            result.error && setErrorText(result.error);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return (
    <Box
      display="grid"
      height="100dvh"
      sx={{
        placeItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 min-w-[350px]"
      >
        <h1 className="text-center">
          <Logo />
        </h1>

        <LargeInput
          id="email"
          label="이메일"
          required
          disabled={isSubmitting}
          control={control}
        />

        <LargeInput
          id="password"
          label="비밀번호"
          type="password"
          required
          disabled={isSubmitting}
          control={control}
        />

        {errorText && (
          <FormErrorText sx={{ justifyContent: 'center' }}>
            {errorText}
          </FormErrorText>
        )}

        <LargeButton
          sx={{ mt: errorText ? 1 : 2 }}
          disabled={isSubmitting}
          type="submit"
        >
          로그인
        </LargeButton>

        <Box textAlign="center">
          <Typography level="body-sm">
            <Typography className="text-gray-400">
              계정이 없으신가요?&nbsp;
            </Typography>
            <Link href="/auth/sign-up" className="text-black hover:underline">
              회원가입
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignInPage;
