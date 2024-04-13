import Container from '@/app/components/nav/Container';
import ManageProductsClient from './ManageProductsClient';

const ManageProducts = () => {
  return (
    <div className=" pt-8">
      <Container>
        <ManageProductsClient />
      </Container>
    </div>
  );
};

export default ManageProducts;
