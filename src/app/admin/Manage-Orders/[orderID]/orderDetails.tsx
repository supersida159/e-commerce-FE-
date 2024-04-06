'use client';
import { getOrder } from '@/app/actions/getProducts';
import Heading from '@/app/components/Heading/heading';
import { Order } from '@/lib/type/order';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import formatPrice from '../../../../../utils/formatPrice';
import OrderItem from './orderitem';

interface OrderDetailsProps {
  order: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  console.log('order:', order);
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = getCookie('token');
        if (typeof token !== 'undefined') {
          // Check if token is defined before using it
          const res = await getOrder(order, token);
          setOrderDetails(res);
          console.log('res:', res);
          console.log('is Array:', Array.isArray(res?.ProductQuantity));
          console.log('Productquantity:', res?.ProductQuantity);
        } else {
          throw new Error('Token is undefined'); // Throw an error if token is undefined
        }
        setLoading(false);
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }
    };

    // Call fetchOrderDetails only once when the component mounts
    fetchOrderDetails();
  }, [order]);

  // Call fetchOrderDetails directly inside the component body

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="mx-auto flex max-w-[1920px] flex-col px-4 md:px-4 xl:px-20">
            <Heading titlle="Order Information" center />
            <div className="mt-8 grid grid-cols-5">
              <div className="col-span-2 justify-start">Product</div>
              <div className="justify-self-center">Price</div>
              <div className="justify-self-center">Quantity</div>
              <div className="justify-self-end">Total</div>
            </div>
            {/* <div>
              {Array.isArray(cartProducts) ? (
                cartProducts.map((item) => (
                  <CartItem key={item.id} cartProduct={item} />
                ))
              ) : (
                // Handle cases where cartProducts is not an array (e.g., display message, redirect)
                <div>Cart items not available</div>
              )}
            </div> */}
          </div>

          {orderDetails ? (
            <>
              {orderDetails.ProductQuantity?.map((item, index) => (
                <OrderItem key={index} productQty={item} />
              ))}
              <div>
                <div className="mb-2 flex items-center justify-between text-2xl font-semibold">
                  <span className="">Subtotal</span>
                  <div className="">{formatPrice(orderDetails.orderTotal)}</div>
                </div>
                <div className="">
                  Taxes and shipping calculated at checkout
                </div>
              </div>
            </>
          ) : (
            <div>Empty Data</div>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetails;
