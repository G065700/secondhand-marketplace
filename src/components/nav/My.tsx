import Link from 'next/link';
import { signOut } from 'next-auth/react';

const My = () => {
  return (
    <ul
      className="
                  absolute left-5 top-9
                  flex flex-col
                  w-full
                  bg-white text-black
                  rounded-lg
                  border border-black
                  text-xs
                "
    >
      <li className="w-full p-2 border-b border-black hover:font-semibold">
        <Link href="/chat">DM</Link>
      </li>
      <li className="w-full p-2 border-b border-black hover:font-semibold">
        <Link href="/my">내 계정</Link>
      </li>
      <li className="w-full p-2 border-b border-black hover:font-semibold">
        <Link href="/my">내역</Link>
      </li>
      <li onClick={() => signOut()} className="p-2 hover:font-semibold">
        로그아웃
      </li>
    </ul>
  );
};

export default My;
