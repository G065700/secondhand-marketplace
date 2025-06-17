import { FC, MouseEvent } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        cursor-pointer
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:bg-cyan-600 hover:border-cyan-600
        hover:text-white
        transition 
        w-full
        ${outline ? 'bg-white' : 'bg-cyan-500'}
        ${outline ? 'border-black' : 'border-cyan-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border' : 'border-2'}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
