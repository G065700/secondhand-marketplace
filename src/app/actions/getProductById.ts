import prisma from '@/helpers/prismadb';

export default async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        user: true,
        category: true,
      },
    });

    if (!product) return null;

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
