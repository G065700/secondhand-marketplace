'use client';

import { useState } from 'react';
import NavItem from '@/components/shared/nav/NavItem';
import { User } from '@/prisma/client';
import { signIn } from 'next-auth/react';
import NavUser from '@/components/shared/nav/NavUser';
import My from '@/components/shared/nav/My';
import { Box, Dropdown, MenuButton } from '@mui/joy';
import SecondHandLogo from '@/components/shared/Logo';
import Link from 'next/link';
import SmallButton from '@/components/shared/button/SmallButton';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className="fixed w-full z-10 bg-black text-white max-w-[2520px]">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: {
            xs: 2.5,
            sm: 5,
            md: 10,
          },
        }}
      >
        <Box sx={{ height: 56, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Link href="/">
            <SecondHandLogo />
          </Link>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavItem currentUser={currentUser} />
          </Box>
        </Box>

        <SmallButton
          onClick={handleMobileMenu}
          sx={{
            display: { xs: 'block', sm: 'none' },
            fontSize: 'lg',
            backgroundColor: 'transparent',
            ':hover': {
              backgroundColor: 'transparent',
              fontWeight: 'bold',
            },
          }}
        >
          {!mobileMenu ? '+' : '-'}
        </SmallButton>

        {currentUser ? (
          <Dropdown>
            <MenuButton
              size="sm"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
                color: 'white',
                border: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <NavUser image={currentUser.image} name={currentUser.name} />
            </MenuButton>
            <My userType={currentUser.userType} />
          </Dropdown>
        ) : (
          <SmallButton
            onClick={() => signIn()}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            로그인
          </SmallButton>
        )}
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {!mobileMenu ? null : <NavItem mobile currentUser={currentUser} />}
      </Box>
    </nav>
  );
};

export default Navbar;
