import OrderDetails from './orderDetail';

interface OrderDetailsProps {
  params: {
    orderDetails: string;
  };
}

const orderDetails: React.FC<OrderDetailsProps> = ({ params }) => {
  return <OrderDetails orderID={params.orderDetails} />;
};

export default orderDetails;
