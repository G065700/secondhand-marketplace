import { Control, FieldValues, useController } from 'react-hook-form';
import { FC } from 'react';
import { FormControl, FormLabel, Input, InputProps } from '@mui/joy';
import FormErrorText from '@/components/shared/FormErrorText';

interface LargeInputProps {
  id: string;
  label?: string;
  asterisk?: boolean;
  control: Control<FieldValues>;
}

const regExps: { [p: string]: RegExp } = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
};

const LargeInput: FC<LargeInputProps & Omit<InputProps, 'id'>> = (props) => {
  const {
    id,
    type = 'text',
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
      pattern: {
        value: regExps[id],
        message:
          id === 'password'
            ? '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.'
            : `${label} 형식으로 입력해 주세요.`,
      },
      validate: (value, formValues) => {
        if (id === 'passwordConfirm' && formValues.password !== value) {
          return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
        }
      },
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
      <Input
        {...rest}
        {...field}
        variant="soft"
        size="lg"
        sx={{
          fontSize: 'md',
          boxShadow: 'none',
          '--Input-focusedThickness': '0px',
        }}
        type={type}
        disabled={props.disabled}
      />
      {error && <FormErrorText>{error.message}</FormErrorText>}
    </FormControl>
  );
};

export default LargeInput;
