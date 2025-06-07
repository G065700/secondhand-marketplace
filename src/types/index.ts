import { Message, User } from '@/prisma/client';

export type TUserWidthChat = User & {
  conversations: TConversation[];
};

export type TConversation = {
  id: string;
  messages: Message[];
  users: User[];
};
