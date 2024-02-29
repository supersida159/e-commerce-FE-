'use client';

import { Avatar } from '@mui/material';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Backdrop from './BackDrop';
import MenuItem from './MenuItem';
const MenuUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggle}
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-full
            border-[1px]
            border-slate-800
            p-2
            hover:shadow-sm
            "
        >
          <Avatar sx={{ width: 30, height: 30 }} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute
                right-0
                top-12
                flex
                w-[170px]
                cursor-pointer
                flex-col
                overflow-hidden
                rounded-md
                bg-white
                text-sm
                shadow-md"
          >
            <div>
              <Link href="orders">
                <MenuItem onClick={toggle}>Your Order</MenuItem>
              </Link>
              <Link href="profile">
                <MenuItem onClick={toggle}>Your Profile</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  toggle();
                  localStorage.clear();
                }}
              >
                LogOut
              </MenuItem>
            </div>
            <div>
              <Link href="login">
                <MenuItem onClick={toggle}>Login</MenuItem>
              </Link>
              <Link href="register">
                <MenuItem onClick={toggle}>Register</MenuItem>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <Backdrop onClick={toggle} /> : null}
    </>
  );
};

export default MenuUser;
