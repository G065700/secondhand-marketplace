import prisma from '@/helpers/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const body = await request.json();

  const { id, suspension } = body;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      suspension,
    },
  });

  return NextResponse.json(product);
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
