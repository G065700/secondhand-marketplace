import { ReactNode } from 'react';
import ClientProviders from '@/app/auth/clientProviders';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ClientProviders>{children}</ClientProviders>;
}
