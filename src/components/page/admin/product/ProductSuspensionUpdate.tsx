import SmallButton from '@/components/shared/button/SmallButton';
import { FormControl, Radio, RadioGroup, Typography } from '@mui/joy';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { memo, useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProductSuspensionUpdateProps {
  productId: string;
  productSuspension: boolean;
}

const ProductSuspensionUpdate = ({
  productId,
  productSuspension,
}: ProductSuspensionUpdateProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      suspension: productSuspension,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (body) => {
      setIsSubmitting(true);
      try {
        await axios.patch('/api/admin/products/suspension', {
          id: productId,
          suspension: body.suspension === 'true',
        });
        toast.success('저장되었습니다.');
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [productId],
  );

  return (
    <FormControl>
      <Typography level="title-md">
        판매 중지
        <SmallButton
          sx={{ ml: 1 }}
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          저장
        </SmallButton>
      </Typography>

      <Controller
        name="suspension"
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

export default memo(ProductSuspensionUpdate);
