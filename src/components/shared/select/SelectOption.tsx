import { Option, OptionProps } from '@mui/joy';
import { FC } from 'react';

const SelectOption: FC<OptionProps> = (props) => {
  return <Option {...props} sx={{ border: 'none' }} />;
};

export default SelectOption;
