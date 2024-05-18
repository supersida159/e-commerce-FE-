'use client';
import { useUser } from '@/lib/hooks/useUser';

interface CheckRoleProps {
  children: React.ReactNode;
}

const CheckRole: React.FC<CheckRoleProps> = ({ children }) => {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      {user?.role === 'admin' ? (
        children
      ) : (
        <div
          className="flex h-[50vh] w-full items-center justify-center font-mono 
         text-2xl md:text-3xl"
        >
          Oops! Access denied.
        </div>
      )}
    </div>
  );
};

export default CheckRole;

