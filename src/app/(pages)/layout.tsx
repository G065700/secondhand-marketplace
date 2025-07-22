import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientProviders from '@/app/(pages)/clientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '2ndHAND - 내 물건을 거래하세요!',
    template: '%s | 2ndHAND',
  },
  description:
    '2ndHAND은 중고 물품을 쉽고 안전하게 거래할 수 있는 마켓플레이스입니다. 다양한 상품을 찾아보고, 나만의 물건을 판매해보세요!',
  keywords: ['중고거래', '마켓플레이스', '중고', '판매', '구매', '2ndHAND'],
  authors: [{ name: 'ebk' }],
  creator: 'ebk',
  publisher: 'ebk',

  openGraph: {
    title: '2ndHAND - 내 물건을 거래하세요!',
    description:
      '2ndHAND은 중고 물품을 쉽고 안전하게 거래할 수 있는 마켓플레이스입니다. 다양한 상품을 찾아보고, 나만의 물건을 판매해보세요!',
    url: 'https://ebk-secondhandmarketplace.vercel.app/',
    siteName: '2ndHAND',
    images: [
      {
        url: 'https://ebk-secondhandmarketplace.vercel.app/favicon.ico',
        width: 1200,
        height: 630,
        alt: '2ndHAND 중고 마켓플레이스',
      },
    ],
    type: 'website',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders currentUser={currentUser}>{children}</ClientProviders>
      </body>
    </html>
  );
}
