import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const regExps: { [p: string]: RegExp } = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const Input: FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute text-neutral-700 top-5 left-2">&#8361;</span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: required && `${label}은 필수 입력 항목입니다.`,
          pattern: {
            value: regExps[id],
            message: `${label} 형식으로 입력해 주세요.`,
          },
          validate: (value, formValues) => {
            if (id === 'passwordConfirm' && formValues.password !== value) {
              return 'Password 와 Password Confirm 이 일치하지 않습니다.';
            }
          },
        })}
        placeholder=""
        type={type}
        className={`
          w-full
          p-3
          pt-7
          font-light
          border-2
          bg-white
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => (
          <p className="text-xs text-rose-500 mt-1 h-3 ml-2">{message}</p>
        )}
      />
      <label
        className={`
          absolute 
          text-md 
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
        {required && '*'}
      </label>
    </div>
  );
};

export default Input;
