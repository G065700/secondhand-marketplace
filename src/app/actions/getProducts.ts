import prisma from '@/helpers/prismadb';
import { COUNT_PER_PAGE } from '@/constants';

export interface ProductsParams {
  title?: string; // 상품명
  categoryId?: string; // 카테고리 Id
  // latitude?: number;
  // longitude?: number;
  soldOut?: boolean; // 판매완료 여부
  suspension?: boolean; // 판매중지 여부
  userId?: string; // 해당 상품 등록한 User
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
      userId,
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

    if (userId) {
      query.userId = userId;
    }

    const [totalItems, products] = await prisma.$transaction([
      prisma.product.count({ where: query }),
      prisma.product.findMany({
        where: query,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: skip ? Number(skip) : 0,
        take: Number(take),
      }),
    ]);

    return {
      data: products,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
