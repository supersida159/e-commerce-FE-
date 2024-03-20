'use server';
import Container from '@/app/components/nav/Container';
import ManageOrdersClient from './ManageOrdersClient';

const ManageOrders = async () => {
  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient />
      </Container>
    </div>
  );
};

export default ManageOrders;
