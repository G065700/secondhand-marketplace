import prisma from '@/helpers/prismadb';

interface Params {
  productId?: string;
}

export default async function getProductById(params: Params) {
  try {
    const { productId } = await params;

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
