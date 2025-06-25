import bcrypt from 'bcryptjs';
import prisma from '@/helpers/prismadb';
import { NextResponse } from 'next/server';
import { ERRORS } from '@/constants';

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  const alreadyExistUser = await prisma.user.findUnique({
    where: { email },
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

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
