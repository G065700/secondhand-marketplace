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

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  );
}
