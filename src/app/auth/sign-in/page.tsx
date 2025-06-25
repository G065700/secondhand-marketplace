'use client';

// import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import Button from '@/components/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from '@mui/joy';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalidAccount, setIsInvalidAccount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailVal = watch('email');
  const passwordVal = watch('password');

  useEffect(() => {
    setIsInvalidAccount(false);
  }, [emailVal, passwordVal]);

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        ...body,
        redirect: false,
      });

      if (result) {
        if (result.ok) {
          router.push('/auth/sign-in');
        } else {
          setIsInvalidAccount(true);
        }
      }
    } catch (error) {
      console.log(error);
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
          <FormLabel>이메일</FormLabel>
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
          <FormLabel>비밀번호</FormLabel>
          <Input
            variant="soft"
            size="lg"
            sx={{ fontSize: 'md' }}
            type="password"
            disabled={isSubmitting}
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
            })}
          />
          <FormHelperText sx={{ color: 'red', maxWidth: 350 }}>
            {errors.password?.message as string}
          </FormHelperText>
        </FormControl>

        {isInvalidAccount && (
          <FormHelperText
            sx={{ color: 'red', width: 350, justifyContent: 'center' }}
          >
            이메일 또는 비밀번호가 일치하지 않습니다.
          </FormHelperText>
        )}

        <Button
          type="submit"
          size="lg"
          sx={{ mt: isInvalidAccount ? 1 : 2 }}
          disabled={isSubmitting}
        >
          로그인
        </Button>

        <Box textAlign="center">
          <Typography level="body-sm">
            <span className="text-gray-400">계정이 없으신가요?&nbsp;</span>
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
