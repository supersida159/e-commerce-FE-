'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors
}) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
            by-white
            peer
            max-h-[150px]
            min-h-[150px]
            w-full
            rounded-md
            border-2
            p-4
            pt-6
            font-light
            outline-none
            transition
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}`}
      />
      <label
        htmlFor={id}
        className={`
            text-md
            absolute
            left-4
            top-5
            z-10
            origin-[0]
            -translate-y-3
            transform
            cursor-text
            duration-150
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:scale-100
            peer-focus:-translate-y-4
            peer-focus:scale-75

            `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
