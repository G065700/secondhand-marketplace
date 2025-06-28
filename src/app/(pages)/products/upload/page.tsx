import Container from '@/components/Container';
import ProductUploadClient from '@/app/(pages)/products/upload/ProductUploadClient';
import getCategories from '@/app/actions/getCategories';

const ProductUploadPage = async () => {
  const categories = await getCategories();

  return (
    <Container>
      {/*<div className="max-w-screen-lg mx-auto">*/}
      <ProductUploadClient categories={categories} />
      {/*</div>*/}
    </Container>
  );
};

export default ProductUploadPage;
