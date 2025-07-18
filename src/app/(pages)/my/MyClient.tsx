'use client';

import { User } from '@/prisma/client';
import { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '@/components/shared/Heading';
import { Box } from '@mui/joy';
import Image from 'next/image';
import previewImage from '@/helpers/previewImage';
import uploadImage from '@/helpers/uploadImage';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import SmallButton from '@/components/shared/button/SmallButton';
import LargeInput from '@/components/shared/input/LargeInput';
import LargeButton from '@/components/shared/button/LargeButton';

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

  const { control, handleSubmit, setError } = useForm<FieldValues>({
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
              <SmallButton
                variant="outlined"
                onClick={chooseImage}
                disabled={isSubmitting}
              >
                이미지 선택
              </SmallButton>
              {profileImagePreview && (
                <SmallButton
                  variant="outlined"
                  color="danger"
                  onClick={removeImage}
                  disabled={isSubmitting}
                >
                  이미지 삭제
                </SmallButton>
              )}
            </Box>
          </Box>

          <LargeInput
            id="name"
            label="이름"
            required
            asterisk
            disabled={isSubmitting}
            control={control}
          />

          <LargeInput
            id="email"
            label="이메일"
            required
            asterisk
            disabled={isSubmitting}
            control={control}
          />

          <LargeInput
            id="password"
            label="비밀번호"
            type="password"
            disabled={isSubmitting}
            control={control}
          />

          <LargeInput
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            disabled={isSubmitting}
            control={control}
          />
        </Box>
        <LargeButton disabled={isSubmitting}>저장</LargeButton>
      </form>
    </Box>
  );
};

export default MyClient;
