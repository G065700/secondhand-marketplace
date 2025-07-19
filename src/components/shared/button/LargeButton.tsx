import { Button, ButtonProps } from '@mui/joy';

const LargeButton = (props: ButtonProps) => {
  const { type = 'submit', ...rest } = props;
  return <Button {...rest} type={type} size="lg" />;
};

export default LargeButton;
