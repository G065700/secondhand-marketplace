import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  // const currentUser = await getCurrentUser();
  //
  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const body = await request.json();

  const operations = body.map(
    (category: { id?: string; order: string; name: string }) => {
      const { id: categoryId, order, name } = category;

      if (categoryId) {
        return prisma.category.update({
          where: { id: categoryId },
          data: {
            order: Number(order),
            name,
          },
        });
      } else {
        return prisma.category.create({
          data: {
            order: Number(order),
            name,
          },
        });
      }
    },
  );

  const categories = await Promise.all(operations);
  return NextResponse.json(categories);
}
