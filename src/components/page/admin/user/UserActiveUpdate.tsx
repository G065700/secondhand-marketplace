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

interface UserActiveUpdateProps {
  userId: string;
  active: boolean;
}

const UserActiveUpdate = ({ userId, active }: UserActiveUpdateProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      active: String(active),
    },
  });

  const onActiveSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsSubmitting(true);
    try {
      await axios.patch('/api/admin/users/active', {
        id: userId,
        active: body.active === 'true',
      });
      toast.success('저장되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormControl>
      <Typography level="title-md">
        활성화 여부
        <SmallButton
          size="sm"
          sx={{ ml: 1 }}
          disabled={isSubmitting}
          onClick={handleSubmit(onActiveSubmit)}
        >
          저장
        </SmallButton>
      </Typography>

      <Controller
        name="active"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            orientation="horizontal"
          >
            <Radio value="true" label="Y" variant="outlined" color="primary" />
            <Radio value="false" label="N" variant="outlined" color="primary" />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default UserActiveUpdate;
