import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { menus } from '@/menus';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // 로그인하지 않은 유저가 접근할 수 없는 페이지
  const privatePaths = [
    '/my',
    '/admin',
    '/chat',
    '/histories',
    '/products/upload',
  ];
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));
  const isOnlyUserMenu = menus.some(
    (menu) => pathname.startsWith(menu.path) && menu.role === 'User',
  );

  if (isPrivatePath && (!session || (session && !session.active))) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // 일반 사용자가 관리자 전용 화면 접근 시 홈 화면으로 이동
  if (pathname.startsWith('/admin') && session?.userType === 'User') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 관리자가 일반 사용자 전용 화면 접근 시 홈 화면으로 이동
  if (
    isPrivatePath &&
    isOnlyUserMenu &&
    session?.userType === 'Admin' &&
    !pathname.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 이미 로그인된 사용자는 로그인, 회원가입 페이지 접근 불가
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my/:path*',
    '/admin/:path*',
    '/chat/:path*',
    '/histories/:path*',
    '/products/upload',
    '/auth/:path*',
  ],
};
