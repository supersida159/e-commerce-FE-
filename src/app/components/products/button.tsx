'use client';

import { Icon } from '@mui/material';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-md
    border-slate-700
    transition
    hover:opacity-80
    disabled:cursor-not-allowed
    disabled:opacity-70
    ${outline ? 'bg-white' : 'bg-slate-700'}
    ${outline ? 'text-slate-700' : 'text-white'}
    ${outline ? 'border-slate-700' : 'border-slate-700'}
    ${small ? 'text-sm font-light' : 'text-md font-semibold'}
    ${small ? 'border-[1px] px-2 py-1' : 'border-2 px-4 py-3'}
7    ${custom ? custom : ''}
    `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
