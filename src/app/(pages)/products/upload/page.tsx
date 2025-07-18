import Container from '@/components/shared/layout/Container';
import ProductUploadClient from '@/app/(pages)/products/upload/ProductUploadClient';
import getCategories from '@/app/actions/getCategories';

const ProductUploadPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      <ProductUploadClient categories={categories} />
    </Container>
  );
};

export default ProductUploadPage;
