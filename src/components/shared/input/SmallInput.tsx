import { Control, useController } from 'react-hook-form';
import { FC } from 'react';
import { FormControl, FormLabel, Input, InputProps } from '@mui/joy';

interface SmallInputProps {
  id: string;
  label?: string;
  asterisk?: boolean;
  formatPrice?: boolean;
  control: Control;
}

const SmallInput: FC<SmallInputProps & Omit<InputProps, 'id'>> = (props) => {
  const {
    id,
    type = 'text',
    label,
    required = false,
    asterisk = false,
    control,
    ...rest
  } = props;

  const { field } = useController({
    name: id,
    control,
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
        size="sm"
        sx={{
          fontSize: 'sm',
          boxShadow: 'none',
          '--Input-focusedThickness': '0px',
        }}
        type={type}
        disabled={props.disabled}
      />
    </FormControl>
  );
};

export default SmallInput;
