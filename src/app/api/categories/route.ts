import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';
import getCategories from '@/app/actions/getCategories';
import { Category } from '@/prisma/client';

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

  const modifiedCategories: Category[] = await request.json();
  const modifiedCategoryIds: string[] = modifiedCategories.map(
    (modifiedCategory) => modifiedCategory.id,
  );

  const originCategories = await getCategories();

  const deleteTargetCategoryIds: string[] = [];

  originCategories.forEach((originCategory) => {
    if (!modifiedCategoryIds.includes(originCategory.id)) {
      deleteTargetCategoryIds.push(originCategory.id);
    }
  });

  const deleteOperation = deleteTargetCategoryIds.map((categoryId) =>
    prisma.category.delete({
      where: { id: categoryId },
    }),
  );

  const operations = modifiedCategories.map((category: Category) => {
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
  });

  const categories = await Promise.all([...deleteOperation, ...operations]);
  return NextResponse.json(categories);
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
