'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  id,
  label,
  disabled,
  register
}) => {
  return (
    <div className="">
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        type="checkbox"
        placeholder=""
        className="mr-2"
      />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckBox;
