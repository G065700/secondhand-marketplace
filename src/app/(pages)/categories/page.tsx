import Container from '@/components/Container';
import getCategories from '@/app/actions/getCategories';
import { formatTime } from '@/helpers/dayjs';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import CategoriesOrigin from '@/components/categories/CategoriesOrigin';
import CategoriesTableHeader from '@/components/categories/CategoriesTableHeader';
import CategoriesManaging from '@/components/categories/CategoriesManaging';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <div className="flex gap-8">
        <div className="w-[250px]">
          <div className="h-8">
            <span>최신수정일</span>&nbsp;
            <span className="font-semibold">
              {formatTime(categories[0].updatedAt)}
            </span>
          </div>
          <div className="mt-2">
            <CategoriesTableHeader />
            <CategoriesOrigin categories={categories} />
          </div>
        </div>
        <div>
          <FaArrowAltCircleRight
            size={40}
            style={{ height: '100%', display: 'flex', alignItems: 'center' }}
          />
        </div>
        <div className="flex-1">
          <CategoriesManaging categories={categories} />
        </div>
      </div>
    </Container>
  );
};

export default CategoriesPage;
