'use client';

import { User } from '@/prisma/client';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { formatTime } from '@/helpers/dayjs';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  FormControl,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from '@mui/joy';

interface UserClientProps {
  user: User;
}

const UserClient = ({ user }: UserClientProps) => {
  const [isUserTypeSubmitting, setIsUserTypeSubmitting] = useState(false);
  const [isActiveSubmitting, setIsActiveSubmitting] = useState(false);

  const { control: userTypeControl, handleSubmit: userTypeHandleSubmit } =
    useForm<FieldValues>({
      defaultValues: {
        userType: user.userType,
      },
    });

  const onUserTypeSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsUserTypeSubmitting(true);
    try {
      await axios.patch('/api/admin/users/type', { ...body, id: user.id });
      toast.success('자징되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserTypeSubmitting(false);
    }
  };

  const { control: activeControl, handleSubmit: activeHandleSubmit } =
    useForm<FieldValues>({
      defaultValues: {
        active: String(user.active),
      },
    });

  const onActiveSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsActiveSubmitting(true);
    try {
      await axios.patch('/api/admin/users/active', {
        id: user.id,
        active: body.active === 'true',
      });
      toast.success('저장되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsActiveSubmitting(false);
    }
  };

  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{
        p: 4,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Image
        src={user.image || '/default-user-image.png'}
        alt=""
        height={100}
        width={100}
        className="w-40 h-40 rounded-full"
      />

      <div>
        <Typography level="title-md">이름</Typography>
        <Typography level="body-md">{user.name}</Typography>
      </div>

      <div>
        <Typography level="title-md">이메일</Typography>
        <Typography level="body-md">{user.email}</Typography>
      </div>

      <FormControl>
        <Typography level="title-md">
          구분
          <Button
            size="sm"
            sx={{ ml: 1 }}
            disabled={isUserTypeSubmitting}
            onClick={userTypeHandleSubmit(onUserTypeSubmit)}
          >
            저장
          </Button>
        </Typography>

        <Controller
          name="userType"
          control={userTypeControl}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              orientation="horizontal"
            >
              <Radio
                value="Admin"
                label="관리자"
                variant="outlined"
                color="primary"
              />
              <Radio
                value="User"
                label="일반"
                variant="outlined"
                color="primary"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl>
        <Typography level="title-md">
          활성화 여부
          <Button
            size="sm"
            sx={{ ml: 1 }}
            disabled={isActiveSubmitting}
            onClick={activeHandleSubmit(onActiveSubmit)}
          >
            저장
          </Button>
        </Typography>

        <Controller
          name="active"
          control={activeControl}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              orientation="horizontal"
            >
              <Radio
                value="true"
                label="Y"
                variant="outlined"
                color="primary"
              />
              <Radio
                value="false"
                label="N"
                variant="outlined"
                color="primary"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      <div>
        <Typography level="title-md">최근 수정 일시</Typography>
        <Typography level="body-md">{formatTime(user.updatedAt)}</Typography>
      </div>
    </Sheet>
  );
};

export default UserClient;
