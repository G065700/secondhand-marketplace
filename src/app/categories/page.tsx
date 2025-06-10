import Container from '@/components/Container';
import Heading from '@/components/Heading';
import getCategories from '@/app/actions/getCategories';
import Link from 'next/link';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <Heading
        title={
          <div className="flex justify-between">
            <span>카테고리 목록</span>
            <Link
              href="/categories/manage"
              className="bg-teal-500 text-white font-light px-1 text-lg rounded-lg"
            >
              카테고리 관리
            </Link>
          </div>
        }
      />
      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </Container>
  );
};

export default CategoriesPage;
