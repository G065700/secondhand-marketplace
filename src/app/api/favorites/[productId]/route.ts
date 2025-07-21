import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const productId = request.url.split('/').findLast((element) => element);

  if (!productId) {
    throw new Error('Invalid ProductId');
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const productId = request.url.split('/').findLast((element) => element);

  if (!productId) {
    throw new Error('Invalid ProductId');
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])].filter(
    (favoriteId) => favoriteId !== productId,
  );

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
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
