import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*' as const,
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://ebk-secondhandmarketplace.vercel.app/sitemap.xml',
  };
}
