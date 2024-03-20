'use client';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick
}) => {
  return (
    <>
      <div
        onClick={() => onClick(label)}
        className={`transistion flex cursor-pointer flex-col items-center
        gap-2 rounded-xl border-2 p-4 hover:border-slate-600
        ${selected ? 'border-slate-800' : 'border-slate-400'}`}
      >
        <Icon size={30} />
        <div className="font-medium">{label}</div>
      </div>
    </>
  );
};

export default CategoryInput;
