import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ListDivider, Menu, MenuItem } from '@mui/joy';
import { menus } from '@/menus';
import { UserType } from '@/prisma/client';

interface MyProps {
  currentUserRole: UserType;
}

const My = (props: MyProps) => {
  const { currentUserRole } = props;

  const myMenus = menus.filter(
    (menu) =>
      !menu.role || (menu.role !== 'Admin' && menu.role === currentUserRole),
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
