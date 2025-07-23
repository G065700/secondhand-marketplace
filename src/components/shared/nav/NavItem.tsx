import Link from 'next/link';
import { User } from '@/prisma/client';
import { signIn, signOut } from 'next-auth/react';
import { menus } from '@/menus';

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  if (!currentUser) {
    return (
      <ul
        className={`w-full text-sm flex justify-center items-center gap-4 ${mobile && 'flex-col h-full py-4'}`}
      >
        {mobile && (
          <li
            onClick={() => signIn()}
            className="py-2 text-center cursor-pointer"
          >
            로그인
          </li>
        )}
      </ul>
    );
  }

  const myMenus = getMyMenus(currentUser);

  const myAdminMenus = myMenus.filter((myMenu) => myMenu.role === 'Admin');
  const myNotAdminMenus = myMenus.filter((myMenu) => myMenu.role !== 'Admin');

  return (
    <ul
      className={`w-full text-sm flex justify-center items-center gap-4 ${mobile && 'flex-col h-full py-4'}`}
    >
      {myAdminMenus.map((myAdminMenu) => (
        <li key={myAdminMenu.path} className="py-2 text-center">
          <Link href={myAdminMenu.path}>{myAdminMenu.name}</Link>
        </li>
      ))}

      {mobile && (
        <>
          {myNotAdminMenus.map((myNotAdminMenu) => (
            <li key={myNotAdminMenu.path} className="py-2 text-center">
              <Link href={myNotAdminMenu.path}>{myNotAdminMenu.name}</Link>
            </li>
          ))}
          <li
            onClick={() => signOut()}
            className="py-2 text-center cursor-pointer"
          >
            로그아웃
          </li>
        </>
      )}
    </ul>
  );
};

export default NavItem;

const getMyMenus = (currentUser: User) => {
  const hasAdminRole = currentUser.userType === 'Admin';

  if (hasAdminRole) {
    return menus.filter((menu) => menu.role === 'Admin' || !menu.role);
  }

  return menus.filter((menu) => menu.role === 'User' || !menu.role);
};
