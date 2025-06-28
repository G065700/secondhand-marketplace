import prisma from '@/helpers/prismadb';
import { NextResponse } from 'next/server';
import { ERRORS } from '@/constants';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  const body = await request.json();

  const { id, name, email, image, password } = body;

  const alreadyExistUser = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        email: currentUser?.email,
      },
    },
  });

  if (alreadyExistUser) {
    const error = ERRORS.find((error) => error.code === 'ALREADY_EXIST_EMAIL');

    if (error) {
      const { code, message, status } = error;

      return new NextResponse(
        JSON.stringify({
          code,
          message,
        }),
        { status },
      );
    }
  }

  const data: {
    name: string;
    email: string;
    image?: string;
    password?: string;
  } = {
    name,
    email,
  };

  if (image) {
    data.image = image;
  }

  if (password) {
    data.password = password;
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return NextResponse.json(user);
}
