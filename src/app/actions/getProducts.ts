import prisma from '@/helpers/prismadb';
import { PRODUCTS_PER_PAGE } from '@/constants';

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
  categoryId?: string;
  page?: number;
  skip?: number;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, categoryId, skip } = params;

    let query: any = {};

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      };
    }

    if (longitude) {
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      };
    }

    const totalItems = await prisma.product.count({
      where: query,
    });

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip ? Number(skip) : 0,
      take: PRODUCTS_PER_PAGE,
    });

    return {
      data: products,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
