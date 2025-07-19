import { Control, Controller } from 'react-hook-form';
import { FC } from 'react';
import { SelectProps, Select, Option, FormControl, FormLabel } from '@mui/joy';

interface SmallSelectProps {
  id: string;
  label?: string;
  asterisk?: boolean;
  control: Control;
}

const SmallSelect: FC<
  SmallSelectProps & Omit<SelectProps<typeof Option, false>, 'id'>
> = (props) => {
  const {
    id,
    label,
    required = false,
    asterisk = false,
    control,
    children,
    ...rest
  } = props;

  return (
    <FormControl>
      {label && (
        <FormLabel>
          {label}
          {required && asterisk && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <Controller
        {...rest}
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            defaultValue=""
            value={field.value || ''}
            onChange={(_, value) => field.onChange(value)}
            variant="soft"
            size="sm"
            sx={{ boxShadow: 'none' }}
            slotProps={{
              listbox: {
                sx: {
                  boxShadow: 'none',
                },
              },
            }}
          >
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SmallSelect;
