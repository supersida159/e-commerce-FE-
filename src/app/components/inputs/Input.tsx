'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isNumber?: boolean;
  placeholder?: any;
  value?: any;

  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  isNumber
}) => {
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=""
        className={`
            by-white
            peer
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

export default Input;

const InputEditable: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  placeholder,
  value,
  onchange
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={`
            text-md
            left-4
            top-5
            `}
      >
        {label}
      </label>
      <input
        readOnly={disabled}
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        className={`
            by-white
            w-full
            rounded-md
            border-2
            p-4
            font-light
            outline-none
            transition
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}`}
      />
    </div>
  );
};

export { InputEditable };
