import { NextResponse } from 'next/server';
import getProducts, { ProductsParams } from '@/app/actions/getProducts';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/helpers/prismadb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params: ProductsParams = {
    categoryId: searchParams.get('categoryId') || undefined,
    soldOut: searchParams.get('soldOut') === 'true',
    suspension: searchParams.get('suspension') === 'true',
    take: Number(searchParams.get('take')) || 0,
    skip: Number(searchParams.get('skip')) || 0,
  };

  const products = await getProducts(params);
  return NextResponse.json({ ...products, skip: params.skip });
}

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
