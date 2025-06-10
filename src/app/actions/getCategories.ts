import prisma from '@/helpers/prismadb';

export default async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
