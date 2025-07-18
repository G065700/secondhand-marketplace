import { Box } from '@mui/joy';
import getCategories from '@/app/actions/getCategories';
import Container from '@/components/shared/layout/Container';
import CategoriesOrigin from '@/components/page/admin/categories/origin/CategoriesOrigin';
import CategoriesManaging from '@/components/page/admin/categories/managing/CategoriesManaging';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <Box display="flex" gap={2.5}>
        <CategoriesOrigin categories={categories} />

        <Box>
          <FaArrowAltCircleRight
            size={40}
            style={{ height: '100%', display: 'flex', alignItems: 'center' }}
          />
        </Box>

        <CategoriesManaging categories={categories} />
      </Box>
    </Container>
  );
};

export default CategoriesPage;
