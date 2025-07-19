import Link from 'next/link';
import { User } from '@/prisma/client';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  const router = useRouter();

  return (
    <ul
      className={`w-full text-sm flex justify-center items-center gap-4 ${mobile && 'flex-col h-full py-4'}`}
    >
      {currentUser && currentUser.userType === 'Admin' && (
        <>
          <li className="py-2 text-center">
            <Link href="/admin/categories">카테고리</Link>
          </li>
          <li className="py-2 text-center">
            <Link href="/admin/products">상품</Link>
          </li>
          <li className="py-2 text-center">
            <Link href="/admin/users">사용자</Link>
          </li>
        </>
      )}

      {mobile &&
        (currentUser ? (
          <>
            {currentUser.userType === 'User' && (
              <li className="py-2 text-center cursor-pointer">DM</li>
            )}
            <li className="py-2 text-center cursor-pointer">내 계정</li>
            <li
              onClick={() => signOut()}
              className="py-2 text-center cursor-pointer"
            >
              로그아웃
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => signIn()}
              className="py-2 text-center cursor-pointer"
            >
              로그인
            </li>
            <li
              onClick={() => router.push('/auth/sign-in')}
              className="py-2 text-center cursor-pointer"
            >
              회원가입
            </li>
          </>
        ))}
    </ul>
  );
};

export default NavItem;
