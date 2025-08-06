import getCurrentUser from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import HomeClient from './HomeClient';
import { getProductsByCategoryAndPage } from '@/app/actions/getProducts';

interface HomePageProps {
  searchParams: Promise<{
    categoryId?: string;
    skip?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { categoryId, skip } = await searchParams;

  const [currentUser, categories, products] = await Promise.all([
    getCurrentUser(),
    getCategories(),
    getProductsByCategoryAndPage({
      categoryId,
      skip,
    }),
  ]);

  return (
    <HomeClient
      currentUser={currentUser}
      categories={categories}
      products={products}
    />
  );
}
