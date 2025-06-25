import Container from '@/components/Container';
import getCategories from '@/app/actions/getCategories';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import CategoriesOrigin from '@/components/admin/categories/CategoriesOrigin';
import CategoriesManaging from '@/components/admin/categories/CategoriesManaging';
import { Box } from '@mui/joy';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
        }}
      >
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
