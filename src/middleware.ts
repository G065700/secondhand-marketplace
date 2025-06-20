import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  console.log('session', session);

  // 로그인된 사용자만 User/Admin 관련 페이지 접근 가능
  if (
    (pathname.startsWith('/user') || pathname.startsWith('/admin')) &&
    !session
  ) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Admin 사용자만 Admin 관련 페이지 접근 가능
  if (pathname.startsWith('/admin') && session?.userType !== 'Admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 로그인된 사용자는 로그인, 회원가입 페이지 접근 불가
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
