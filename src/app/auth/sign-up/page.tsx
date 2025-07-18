'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/joy';
import Logo from '@/components/shared/Logo';
import LargeInput from '@/components/shared/input/LargeInput';
import LargeButton from '@/components/shared/button/LargeButton';

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/sign-up', body);
      router.push('/auth/sign-in');
    } catch (error: any) {
      const { code, message } = error.response.data;
      if (code === 'ALREADY_EXIST_EMAIL') {
        setError('email', {
          type: code,
          message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        height: '100dvh',
        placeItems: 'center',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
        className="flex flex-col justify-center gap-4 min-w-[350px]"
      >
        <h1 className="text-center">
          <Logo />
        </h1>

        <LargeInput
          id="email"
          label="이메일"
          required
          asterisk
          disabled={isSubmitting}
          control={control}
        />

        <LargeInput
          id="name"
          label="이름"
          required
          asterisk
          disabled={isSubmitting}
          control={control}
        />

        <LargeInput
          id="password"
          label="비밀번호"
          type="password"
          required
          asterisk
          disabled={isSubmitting}
          control={control}
        />

        <LargeInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          required
          asterisk
          disabled={isSubmitting}
          control={control}
        />

        <LargeButton sx={{ mt: 2 }} disabled={isSubmitting}>
          회원가입
        </LargeButton>

        <Box textAlign="center">
          <Typography level="body-sm">
            <span className="text-gray-400">계정이 있으신가요?&nbsp;</span>
            <Link href="/auth/sign-in" className="text-black hover:underline">
              로그인
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignUpPage;
