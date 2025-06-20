'use client';

import { User } from '@/prisma/client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { formatTime } from '@/helpers/dayjs';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UserClientProps {
  user: User;
}

const UserClient = ({ user }: UserClientProps) => {
  const [isUserTypeSubmitting, setIsUserTypeSubmitting] = useState(false);
  const [isActiveSubmitting, setIsActiveSubmitting] = useState(false);

  const { register: userTypeRegister, handleSubmit: userTypeHandleSubmit } =
    useForm<FieldValues>({
      defaultValues: {
        userType: user.userType,
      },
    });

  const onUserTypeSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsUserTypeSubmitting(true);
    try {
      await axios.patch('/api/admin/users/type', { ...body, id: user.id });
      toast.success('수정되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserTypeSubmitting(false);
    }
  };

  const { register: activeRegister, handleSubmit: activeHandleSubmit } =
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
      toast.success('수정되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsActiveSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-3">
          <Image
            src={user.image || '/default-user-image.png'}
            alt=""
            height={100}
            width={100}
            className="w-40 h-40 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2 px-3">
          <label className="font-semibold">이름</label>
          <span>{user.name}</span>
        </div>

        <div className="flex flex-col gap-2 px-3">
          <label className="font-semibold">이메일</label>
          <span>{user.email}</span>
        </div>

        <div className="flex flex-col gap-2 px-3">
          <label className="font-semibold">사용자 구분</label>
          <fieldset className="flex gap-4">
            <label className="flex gap-2">
              <input
                type="radio"
                value="Admin"
                {...userTypeRegister('userType')}
              />
              관리자
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                value="User"
                {...userTypeRegister('userType')}
              />
              일반
            </label>
            <button
              disabled={isUserTypeSubmitting}
              onClick={userTypeHandleSubmit(onUserTypeSubmit)}
              className="w-fit text-white text-sm bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg cursor-pointer"
            >
              저장
            </button>
          </fieldset>
        </div>

        <div className="flex flex-col gap-2 px-3">
          <label className="font-semibold">활성화 여부</label>
          <fieldset className="flex gap-4">
            <label className="flex gap-2">
              <input type="radio" value="true" {...activeRegister('active')} />Y
            </label>
            <label className="flex gap-2">
              <input type="radio" value="false" {...activeRegister('active')} />
              N
            </label>
            <button
              disabled={isActiveSubmitting}
              onClick={activeHandleSubmit(onActiveSubmit)}
              className="w-fit text-white text-sm bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg cursor-pointer"
            >
              저장
            </button>
          </fieldset>
        </div>

        <div className="flex flex-col gap-2 px-3">
          <label className="font-semibold">최근 수정 일시</label>
          <span>{formatTime(user.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserClient;
