import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

interface TextareaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Textarea: FC<TextareaProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, {
          required: required && `${label}은 필수 입력 항목입니다.`,
        })}
        placeholder=""
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
          ${errors[id] ? 'border-orange-400' : 'border-neutral-400'}
          ${errors[id] ? 'focus:border-orange-500' : 'focus:border-black'}
        `}
      />
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => (
          <p className="text-xs text-orange-500 mt-1 h-3 ml-2">{message}</p>
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
          left-4
          z-10 
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-orange-500' : 'text-neutral-400'}
      `}
      >
        {label}
        {required && '*'}
      </label>
    </div>
  );
};

export default Textarea;
