'use client';

import { useState } from 'react';
import NavItem from '@/components/nav/NavItem';
import { User } from '@/prisma/client';
import { signIn } from 'next-auth/react';
import Logo from '@/components/nav/Logo';
import NavUser from '@/components/nav/NavUser';
import My from '@/components/nav/My';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  return (
    <nav className="fixed w-full z-10 bg-black text-white">
      <div className="flex justify-between items-center mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center gap-10 h-14">
          <Logo />

          <div className="hidden sm:block">
            <NavItem currentUser={currentUser} />
          </div>
        </div>

        <div className="sm:hidden">
          <button
            onClick={handleMobileMenu}
            className="w-7 cursor-pointer text-2xl font-bold"
          >
            {!mobileMenu ? '+' : '-'}
          </button>
        </div>

        {currentUser ? (
          <div
            onClick={handleUserMenu}
            className="hidden sm:block relative cursor-pointer text-sm"
          >
            <NavUser image={currentUser.image} name={currentUser.name} />

            {userMenu && <My />}
          </div>
        ) : (
          <div className="hidden sm:block">
            <button className="cursor-pointer text-sm" onClick={() => signIn()}>
              로그인
            </button>
          </div>
        )}
      </div>

      <div className="block sm:hidden">
        {!mobileMenu ? null : <NavItem mobile currentUser={currentUser} />}
      </div>
    </nav>
  );
};

export default Navbar;
