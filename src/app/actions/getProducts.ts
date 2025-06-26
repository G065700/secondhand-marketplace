import prisma from '@/helpers/prismadb';
import { COUNT_PER_PAGE } from '@/constants';

export interface ProductsParams {
  title?: string;
  categoryId?: string;
  // latitude?: number;
  // longitude?: number;
  soldOut?: boolean;
  suspension?: boolean;
  page: number;
  skip: number;
  take: number;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const {
      title,
      categoryId,
      // latitude,
      // longitude,
      soldOut,
      suspension,
      skip,
      take = COUNT_PER_PAGE[0],
    } = params;

    let query: any = {};

    if (title) {
      query.title = {
        contains: title,
      };
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    // if (latitude) {
    //   query.latitude = {
    //     gte: Number(latitude) - 0.01,
    //     lte: Number(latitude) + 0.01,
    //   };
    // }
    //
    // if (longitude) {
    //   query.longitude = {
    //     gte: Number(longitude) - 0.01,
    //     lte: Number(longitude) + 0.01,
    //   };
    // }

    if (soldOut !== undefined) {
      query.soldOut = soldOut;
    }

    if (suspension !== undefined) {
      query.suspension = suspension;
    }

    const totalItems = await prisma.product.count({
      where: query,
    });

    const products = await prisma.product.findMany({
      where: query,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip ? Number(skip) : 0,
      take: Number(take),
    });

    return {
      data: products,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
