import prisma from '@/helpers/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const body = await request.json();

  const { id, userType } = body;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      userType,
    },
  });

  return NextResponse.json(user);
}
