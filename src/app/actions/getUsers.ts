import prisma from '@/helpers/prismadb';
import { UserType } from '@/prisma/client';
import { USERS_PER_PAGE } from '@/constants';

export interface UsersParams {
  name?: string;
  email?: string;
  userType?: UserType;
  active?: boolean;
  page: number;
  skip: number;
  take: number;
}

export default async function getUsers(params: UsersParams) {
  try {
    const {
      name,
      email,
      userType,
      active,
      skip = 0,
      take = USERS_PER_PAGE[0],
    } = params;

    let query: any = {};

    if (name) {
      query.name = {
        contains: name,
      };
    }

    if (email) {
      query.email = {
        contains: email,
      };
    }

    if (userType) {
      query.userType = userType;
    }

    if (active !== undefined) {
      query.active = active;
    }

    const totalItems = await prisma.user.count({
      where: query,
    });

    const users = await prisma.user.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : USERS_PER_PAGE[0],
    });

    return {
      data: users,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
