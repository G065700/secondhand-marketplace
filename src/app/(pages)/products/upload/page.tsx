import Container from '@/components/Container';
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
