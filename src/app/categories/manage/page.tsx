import Container from '@/components/Container';
import Heading from '@/components/Heading';
import getCategories from '@/app/actions/getCategories';
import CategoryClient from '@/app/categories/manage/CategoryClient';

const CategoriesManagePage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <Heading title="카테고리 관리" />
      <CategoryClient categories={categories} />
    </Container>
  );
};

export default CategoriesManagePage;
