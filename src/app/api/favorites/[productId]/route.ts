import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

interface Params {
  productId?: string;
}

export async function POST(_request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = await params;

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

export async function DELETE(
  _request: Request,
  { params }: { params: Params },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = await params;

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
