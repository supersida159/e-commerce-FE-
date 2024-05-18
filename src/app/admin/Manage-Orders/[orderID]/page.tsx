'use server';
import OrderDetails from './orderDetails';

interface IParams {
  orderID: string;
}

const Order = ({ params }: { params: IParams }) => {
  return (
    <div>
      <div>
        <OrderDetails orderID={params.orderID} />
      </div>
    </div>
  );
};

export default Order;
