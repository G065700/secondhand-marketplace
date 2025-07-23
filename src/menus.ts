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
    name: '카테고리',
    role: 'Admin',
    path: '/admin/categories',
  },
  {
    name: '상품',
    role: 'Admin',
    path: '/admin/products',
  },
  {
    name: '사용자',
    role: 'Admin',
    path: '/admin/users',
  },
  {
    name: '내 계정',
    path: '/my',
  },
];
