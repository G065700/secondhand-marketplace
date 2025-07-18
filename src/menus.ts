import { UserType } from '@/prisma/client';

export const menus: { name: string; role?: UserType; path: string }[] = [
  {
    name: 'DM',
    role: 'User',
    path: '/chat',
  },
  {
    name: '판매 이력',
    role: 'User',
    path: '/histories',
  },
  {
    name: '내 계정',
    path: '/my',
  },
];
