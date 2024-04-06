import OrderDetails from './orderDetails';

// interface IParams {
//   orderID: string;
// }

// const Order = ({ params }: { params: IParams }) => {
//   return (
//     <div>
//       <div>
//         <OrderDetails order={params.orderID} />
//       </div>
//     </div>
//   );
// };

// export default Order;

export default function Order({ params }: { params: { orderID: string } }) {
  return (
    <div>
      <div>
        <OrderDetails order={params.orderID} />
      </div>
    </div>
  );
}
