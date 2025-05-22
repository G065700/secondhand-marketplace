import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();
  console.log({ session }, status);

  return (
    <ul
      className={`w-full text-md flex justify-center items-center gap-4 ${mobile && 'flex-col h-full py-4'}`}
    >
      <li className="py-2 text-center cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center cursor-pointer">
        <Link href="/user">User</Link>
      </li>

      <li className="py-2 text-center cursor-pointer">
        {session?.user ? (
          <button onClick={() => signOut()}>SignOut</button>
        ) : (
          <button onClick={() => signIn()}>SignIn</button>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
