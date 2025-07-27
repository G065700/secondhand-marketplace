import getCurrentUser from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import HomeClient from './HomeClient';

export default async function Home() {
  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getCategories(),
  ]);

  return <HomeClient currentUser={currentUser} categories={categories} />;
}
