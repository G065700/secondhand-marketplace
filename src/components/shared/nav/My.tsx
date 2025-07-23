import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ListDivider, Menu, MenuItem } from '@mui/joy';
import { menus } from '@/menus';

const My = () => {
  const myMenus = menus.filter((menu) => !menu.role);

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
