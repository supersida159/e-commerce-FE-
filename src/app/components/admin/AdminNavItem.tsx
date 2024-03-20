import { IconType } from 'react-icons';

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label
}) => {
  return (
    <div
      className={`transistion flex cursor-pointer items-center justify-center gap-2 border-b-2 p-2 text-center hover:text-slate-800 
      ${selected ? 'border-b-slate-800 text-slate-800' : 'border-s-transparent text-slate-500'}`}
    >
      <Icon size={20} />
      <div className=" break-normal text-center text-sm font-medium ">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
