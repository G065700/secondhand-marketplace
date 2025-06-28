'use client';

import { User } from '@/prisma/client';
import { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '@/components/Heading';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@mui/joy';
import Image from 'next/image';
import previewImage from '@/helpers/previewImage';
import uploadImage from '@/helpers/uploadImage';
import axios from 'axios';
import { signOut } from 'next-auth/react';

interface MyClientProps {
  currentUser: User;
}

const MyClient = ({ currentUser }: MyClientProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, name, email, image } = currentUser;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name,
      email,
      image,
      password: '',
      passwordConfirm: '',
    },
  });

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      const profileImageUrl = profileImage
        ? await uploadImage(profileImage as File)
        : null;

      const changedUserInfo = await axios.patch('/api/my', {
        ...body,
        id,
        image: profileImageUrl,
      });

      if (changedUserInfo.data.email !== currentUser.email) {
        await signOut();
      }
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
    <Box display="flex" justifyContent="center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-[350px]"
      >
        <Heading title="계정 관리" />
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Image
              src={profileImagePreview || image || '/default-user-image.png'}
              width={200}
              height={200}
              alt={name || ''}
              className="object-cover w-[200px] h-[200px] rounded-full"
            />

            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              multiple={false}
              onChange={(e) =>
                previewImage(e, setProfileImagePreview, setProfileImage)
              }
              className="hidden"
            />

            <Box display="flex" gap={1}>
              <Button size="sm" onClick={chooseImage} disabled={isSubmitting}>
                이미지 선택
              </Button>
              {profileImagePreview && (
                <Button
                  size="sm"
                  color="danger"
                  disabled={isSubmitting}
                  onClick={removeImage}
                >
                  이미지 삭제
                </Button>
              )}
            </Box>
          </Box>
          <FormControl>
            <FormLabel>
              이름 <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              variant="soft"
              size="lg"
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
              이메일 <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              variant="soft"
              size="lg"
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
              type="password"
              disabled={isSubmitting}
              variant="soft"
              size="lg"
              {...register('password', {
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
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              type="password"
              disabled={isSubmitting}
              variant="soft"
              size="lg"
              {...register('passwordConfirm', {
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
        </Box>
        <Button type="submit" disabled={isSubmitting} size="lg">
          저장
        </Button>
      </form>
    </Box>
  );
};

export default MyClient;
