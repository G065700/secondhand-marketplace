'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Typography,
} from '@mui/joy';

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
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
      component="section"
      sx={{
        display: 'grid',
        height: '100dvh',
        placeItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 min-w-[350px]"
      >
        <h1 className="text-2xl text-center">
          <span className="font-semibold">2nd</span>
          <span className="text-cyan-500 font-bold">HAND</span>
        </h1>

        <FormControl>
          <FormLabel>
            이메일 <span className="text-red-500">*</span>
          </FormLabel>
          <Input
            variant="soft"
            size="lg"
            sx={{ fontSize: 'md' }}
            disabled={isSubmitting}
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 입력해 주세요.',
              },
            })}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {errors.email?.message as string}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>
            이름 <span className="text-red-500">*</span>
          </FormLabel>
          <Input
            variant="soft"
            size="lg"
            sx={{ fontSize: 'md' }}
            disabled={isSubmitting}
            {...register('name', {
              required: '이름은 필수 입력 항목입니다.',
            })}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {errors.name?.message as string}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>
            비밀번호 <span className="text-red-500">*</span>
          </FormLabel>
          <Input
            variant="soft"
            size="lg"
            sx={{ fontSize: 'md' }}
            type="password"
            disabled={isSubmitting}
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.',
              },
            })}
          />
          <FormHelperText sx={{ color: 'red', maxWidth: 350 }}>
            {errors.password?.message as string}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>
            비밀번호 확인 <span className="text-red-500">*</span>
          </FormLabel>
          <Input
            variant="soft"
            size="lg"
            sx={{ fontSize: 'md' }}
            type="password"
            disabled={isSubmitting}
            {...register('passwordConfirm', {
              required: '비밀번호 확인은 필수 입력 항목입니다.',
              validate: (value, formValues) => {
                if (formValues.password !== value) {
                  return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
                }
              },
            })}
          />
          <FormHelperText sx={{ color: 'red', maxWidth: 350 }}>
            {errors.passwordConfirm?.message as string}
          </FormHelperText>
        </FormControl>

        <Button type="submit" size="lg" sx={{ mt: 2 }} disabled={isSubmitting}>
          회원가입
        </Button>

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
