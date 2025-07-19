import { Button, ButtonProps } from '@mui/joy';

const SmallButton = (props: ButtonProps) => {
  return <Button type={props.type || 'submit'} size="sm" {...props} />;
};

export default SmallButton;
