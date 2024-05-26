'use client';
import { Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdDashboard,
  MdDns,
  MdFormatListBulletedAdd,
  MdLibraryAdd
} from 'react-icons/md';
import AdminNavItem from './AdminNavItem';

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="top-20 w-full border-b-[1px] pt-4 shadow-sm">
      <Container>
        <div className="flex flex-row flex-nowrap items-center justify-between gap-8 overflow-x-auto md:justify-center md:gap-12">
          <Link href="/admin">
            <AdminNavItem
              selected={pathname === '/admin'}
              icon={MdDashboard}
              label="Summary"
            />
          </Link>
          {/* <Link href="/admin/add-product">
            <AdminNavItem
              selected={pathname === '/add-product'}
              icon={MdLibraryAdd}
              label="AddProducts"
            />
          </Link> */}
          <Link href="/admin/add-products">
            <AdminNavItem
              selected={pathname === '/admin/add-products'}
              icon={MdLibraryAdd}
              label="AddProducts"
            />
          </Link>
          <Link href="/admin/Manage-products">
            <AdminNavItem
              selected={pathname === '/admin/Manage-products'}
              icon={MdDns}
              label="Manage-Products"
            />
          </Link>
          <Link href="/admin/Manage-Orders">
            <AdminNavItem
              selected={pathname === '/admin/Manage-Orders'}
              icon={MdFormatListBulletedAdd}
              label="Manage-Orders"
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
