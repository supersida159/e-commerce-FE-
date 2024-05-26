import AdminNav from '@/app/components/admin/AdminNav';
import ChatwootWidget from '@/app/components/chat/ChatBox';
import CheckRole from './CheckRole';

export const metadata = {
  title: 'e-Shop Admin',
  description: 'e-Shop Admin Dashboard'
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <ChatwootWidget messages={[]} />
      <AdminNav />
      <CheckRole>{children}</CheckRole>
    </div>
  );
};

export default AdminLayout;
