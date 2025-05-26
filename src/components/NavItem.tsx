import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { User } from '@/prisma/client';

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  return (
    <ul
      className={`w-full text-md flex justify-center items-center gap-4 ${mobile && 'flex-col h-full py-4'}`}
    >
      <li className="py-2 text-center">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center">
        <Link href="/user">User</Link>
      </li>

      <li className="py-2 text-center">
        {currentUser ? (
          <button className="cursor-pointer" onClick={() => signOut()}>
            SignOut
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => signIn()}>
            SignIn
          </button>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
