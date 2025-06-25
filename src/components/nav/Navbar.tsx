'use client';

import { useState } from 'react';
import NavItem from '@/components/nav/NavItem';
import { User } from '@/prisma/client';
import { signIn } from 'next-auth/react';
import Logo from '@/components/nav/Logo';
import NavUser from '@/components/nav/NavUser';
import My from '@/components/nav/My';
import { Box, Button, Dropdown, MenuButton } from '@mui/joy';

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
          <Logo />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavItem currentUser={currentUser} />
          </Box>
        </Box>

        <Button
          onClick={handleMobileMenu}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {!mobileMenu ? '+' : '-'}
        </Button>

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
            <My />
          </Dropdown>
        ) : (
          <Button
            onClick={() => signIn()}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            로그인
          </Button>
        )}
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {!mobileMenu ? null : <NavItem mobile currentUser={currentUser} />}
      </Box>
    </nav>
  );
};

export default Navbar;
