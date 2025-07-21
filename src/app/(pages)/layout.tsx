import { ReactNode } from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientProviders from '@/app/(pages)/clientProviders';

export default async function PagesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <ClientProviders currentUser={currentUser}>{children}</ClientProviders>
  );
}
