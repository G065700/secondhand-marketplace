import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ListDivider, Menu, MenuItem } from '@mui/joy';
import { UserType } from '@/prisma/client';
import { menus } from '@/menus';

const My = ({ userType }: { userType: UserType }) => {
  const myMenus = menus.filter(
    (menu) => (menu.role && menu.role === userType) || !menu.role,
  );

  return (
    <Menu size="sm" sx={{ minWidth: 100 }}>
      {myMenus.map((menu) => (
        <MenuItem key={menu.path}>
          <Link href={menu.path} className="w-full">
            {menu.name}
          </Link>
        </MenuItem>
      ))}

      <ListDivider />
      <MenuItem onClick={() => signOut()} className="w-full">
        로그아웃
      </MenuItem>
    </Menu>
  );
};

export default My;
