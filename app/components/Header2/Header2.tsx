'use client';
import theme from '@/app/theme/theme.config';
import Button from '@/app/ui/atoms/Button';
import { NAV_LINKS } from '@/app/utils/data';
import { INavLinks } from '@/app/utils/interface';
import CloseIcon from '@/public/close.svg';
import Hamburger from '@/public/hamburger.svg';
import OwanbeLogo from '@/public/owanbe.svg';
import { ConfigProvider, Drawer } from 'antd'; 
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import blank from "@/public/blank.svg";
import { useCookies } from "react-cookie";
import useFetch from "../forms/create-events/auth";

function Header2(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { isLoggedIn } = useFetch();
  const [cookies, setCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
  ]);

  const isRegistered = cookies?.is_registered === "registered";

  const pathCheck =
    pathname.includes('password-reset') ||
    pathname.includes('forgot-password') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/verify-account';

  // Check if NAV_LINKS should be displayed
  const showNavLinks = !pathCheck && pathname !== '/discover'; // Add other pages as needed

  const isNotLoggedIn = !['/login', '/signup'].includes(pathname);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        ...theme,
      }}
    >
      <header>
        {/* LG && XL SCREENS */}
        <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 px-8 py-5 hidden md:hidden lg:grid lg:grid-cols-3 lg:items-center">
          <div>
            <Link href="/" shallow>
              <Image
                src={OwanbeLogo}
                alt="Ostivities Logo"
                style={{ height: '40px' }}
                className="w-[140px]"
              />
            </Link>
          </div>
          {/* Conditionally render NAV_LINKS */}
          
          
        </nav>

        {/* SM AND MD SCREENS */}
        <div className="bg-white shadow-sm flex flex-row items-center justify-between px-2 py-3 lg:hidden">
          <Link href="/" shallow>
            <Image
              src={OwanbeLogo}
              alt="Ostivities Logo"
              style={{ width: "110px", height: "50px" }}
            />
          </Link>

          </div>
        
      </header>
    </ConfigProvider>
  );
}

export default Header2;
