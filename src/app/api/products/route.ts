import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    categoryId,
    latitude,
    longitude,
    price,
  } = body;

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      imageSrc,
      categoryId,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(product);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const {
    id,
    title,
    description,
    price,
    categoryId,
    latitude,
    longitude,
    soldOut,
  } = body;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price,
      categoryId,
      latitude,
      longitude,
      soldOut,
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
