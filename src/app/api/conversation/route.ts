import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: currentUser.id,
            },
          },
        },
        {
          users: {
            some: {
              id: body.receiverId,
            },
          },
        },
      ],
    },
  });

  if (!conversation) {
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: currentUser.id,
        receiverId: body.receiverId,
        users: {
          connect: [{ id: currentUser.id }, { id: body.receiverId }],
        },
      },
    });

    return NextResponse.json(newConversation);
  } else {
    return NextResponse.json(conversation);
  }
}
