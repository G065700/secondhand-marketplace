import { FormHelperText } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';

interface FormErrorTextProps {
  children: ReactNode;
  sx?: SxProps;
}

const FormErrorText = ({ children, sx }: FormErrorTextProps) => {
  return (
    <FormHelperText sx={{ color: 'red', width: 350, ...sx }}>
      {children}
    </FormHelperText>
  );
};

export default FormErrorText;
