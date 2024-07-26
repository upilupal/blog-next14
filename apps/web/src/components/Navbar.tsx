'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slice/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setOpen(false);
  };
  return (
    <nav
      className={`sticky top-0 z-50 ${
        scrolled ? 'bg-primary text-secondary' : 'bg-transparent'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between py-2">
          <h1 className="md:text-3xl text-xl font-bold">FIT HUB</h1>

          {/* MOBILE SCREEN MENU */}
          <div className="md:hidden">
            <Menu
              width={28}
              height={28}
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <div className="">
                {Boolean(id) ? (
                  <div className=" absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
                    <Link href={'/'} onClick={handleMenuClick}>
                      Home
                    </Link>
                    <Link href={'/write'} onClick={handleMenuClick}>
                      Write
                    </Link>
                    <Link href={'/profile'} onClick={handleMenuClick}>
                      Profile
                    </Link>
                    <h3
                      onClick={() => {
                        logout();
                        handleMenuClick();
                      }}
                      className="cursor-pointer"
                    >
                      Logout
                    </h3>
                  </div>
                ) : (
                  <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
                    <Link href="/" onClick={handleMenuClick}>
                      Home
                    </Link>
                    <Link href="/write" onClick={handleMenuClick}>
                      Write
                    </Link>
                    <Link href="/login" onClick={handleMenuClick}>
                      Login
                    </Link>
                    <Link href="/register" onClick={handleMenuClick}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* LARGE SCREEN MENU */}
          {Boolean(id) ? (
            <div className=" hidden md:flex items-center gap-8">
              <Link href={'/'}>Home</Link>
              <Link href={'/write'}>Write</Link>
              <Link href={'/profile'}>Profile</Link>
              <h3 onClick={logout} className="cursor-pointer">
                Logout
              </h3>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8">
              <Link href={'/'}>Home</Link>
              <Link href={'/write'}>Write</Link>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
