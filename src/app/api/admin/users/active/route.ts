import prisma from '@/helpers/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const body = await request.json();

  const { id, active } = body;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      active,
    },
  });

  return NextResponse.json(user);
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
