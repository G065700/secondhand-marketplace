import { FormControl, Radio, RadioGroup, Typography } from '@mui/joy';
import SmallButton from '@/components/shared/button/SmallButton';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserType } from '@/prisma/client';

interface UserTypeUpdateProps {
  userId: string;
  userType: UserType;
}

const UserTypeUpdate = ({ userId, userType }: UserTypeUpdateProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      userType,
    },
  });

  const onUserTypeSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      await axios.patch('/api/admin/users/type', { ...body, id: userId });
      toast.success('자징되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormControl>
      <Typography level="title-md">
        구분
        <SmallButton
          sx={{ ml: 1 }}
          disabled={isSubmitting}
          onClick={handleSubmit(onUserTypeSubmit)}
        >
          저장
        </SmallButton>
      </Typography>

      <Controller
        name="userType"
        control={control}
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
  );
};

export default UserTypeUpdate;
