import prisma from '@/helpers/prismadb';

interface Params {
  userId?: string;
}

export default async function getUserById(params: Params) {
  try {
    const { userId } = await params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
