import Link from 'next/link';

const NavItem = ({ mobile }: { mobile?: boolean }) => {
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
        <button>Signout</button>
      </li>
      <li className="py-2 text-center cursor-pointer">
        <button>Signin</button>
      </li>
    </ul>
  );
};

export default NavItem;
