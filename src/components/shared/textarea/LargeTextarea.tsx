import { Control, useController } from 'react-hook-form';
import { FC } from 'react';
import { FormControl, FormLabel, Textarea, TextareaProps } from '@mui/joy';
import FormErrorText from '@/components/shared/FormErrorText';

interface LargeTextareaProps {
  id: string;
  label?: string;
  asterisk?: boolean;
  control: Control;
}

const LargeTextarea: FC<LargeTextareaProps & Omit<TextareaProps, 'id'>> = (
  props,
) => {
  const {
    id,
    label,
    required = false,
    asterisk = false,
    control,
    ...rest
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name: id,
    control,
    rules: {
      required: required && `${label}은(는) 필수 입력 항목입니다.`,
    },
  });

  return (
    <FormControl>
      {label && (
        <FormLabel>
          {label}
          {required && asterisk && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <Textarea
        {...rest}
        {...field}
        variant="soft"
        size="lg"
        sx={{
          fontSize: 'md',
          boxShadow: 'none',
          '--Input-focusedThickness': '0px',
        }}
        disabled={props.disabled}
      />
      {error && <FormErrorText>{error.message}</FormErrorText>}
    </FormControl>
  );
};

export default LargeTextarea;
