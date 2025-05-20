'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavItem from '@/components/NavItem';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className="relative w-full z-10 bg-teal-500 text-white">
      <div className="flex justify-between items-center mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center text-2xl font-bold h-14">
          <Link href="/">secondHAND</Link>
        </div>

        <div className="text-2xl font-semibold sm:hidden">
          <button onClick={handleMobileMenu}>{!mobileMenu ? '+' : '-'}</button>
        </div>

        <div className="hidden sm:block">
          <NavItem />
        </div>
      </div>

      <div className="block sm:hidden">
        {!mobileMenu ? null : <NavItem mobile />}
      </div>
    </nav>
  );
};

export default Navbar;
