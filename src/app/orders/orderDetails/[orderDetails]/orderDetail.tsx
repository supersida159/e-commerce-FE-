'use client';
import { getOrder } from '@/app/actions/getProducts';
import CartItem from '@/app/cart/CartItem';
import Heading from '@/app/components/Heading/heading';
import { Order } from '@/lib/type/order';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import formatPrice from '../../../../../utils/formatPrice';

interface OrderDetailsProps {
  orderID: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderID }) => {
  const [orderValue, setOrderValue] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Function to format the placeholder date

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resOrder = await getOrder(orderID, getCookie('token') as string);
        if (resOrder) {
          setOrderValue(resOrder);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, []);

  const statusOptions = [
    { value: 1, text: 'Order Cancelled', colorClass: 'text-red-500' },
    { value: 2, text: 'Waiting For Payment', colorClass: 'text-yellow-300' },
    { value: 3, text: 'Waiting for Shipment', colorClass: 'p-2 text-blue-500' },
    { value: 4, text: 'Shipped', colorClass: 'text-green-300' },
    { value: 5, text: 'Delivered', colorClass: 'text-green-800' }
  ];
  const getStatusText = (statusValue: number) => {
    const statusOption = statusOptions.find(
      (option) => option.value === statusValue
    );
    return statusOption ? statusOption.text : '';
  };

  // Format the date as yyyy-MM-dd
  return (
    <>
      {orderValue ? (
        <div className=" flex flex-grow items-center justify-center">
          <div className="flex items-center justify-center md:flex-col lg:flex-row">
            <div className="w-min-[600px] w-max-[1000px] flex flex-col items-center justify-center rounded-lg border border-slate-700 p-4">
              <Heading titlle="OrderDetails" classname="mb-5" center />

              <div className="grid w-full grid-cols-2">
                <div className="justify-start">Order ID: {orderValue.id}</div>
                <div className="flex justify-start">
                  Order Status: {getStatusText(orderValue?.status || 0)}
                </div>
              </div>
              <div className="grid w-full grid-cols-2 p-2">
                <div>Customer Name: {orderValue?.customer_name}</div>{' '}
                <div>Customer Phone: {orderValue?.customer_phone}</div>
              </div>
              <div className="grid w-full grid-cols-3 p-2"></div>
              <div className="grid w-full grid-cols-2 p-2">
                <div className="justify-start">
                  Method: {orderValue.shipping?.Method}
                </div>

                <div>
                  Estimated Date:{' '}
                  {orderValue?.shipping?.EstimatedDelivery.toString().slice(
                    0,
                    10
                  )}
                </div>
              </div>
            </div>

            {/* Order Details Here  */}
            <div className="w-min-[800px] w-max-[1200px] mx-auto rounded-2xl border border-slate-600 md:mt-5 lg:ml-11">
              <div className="mx-auto flex flex-col px-4 md:px-4 xl:px-20">
                <Heading titlle="Products Order Details" center />
                <div className="mt-8 grid grid-cols-5">
                  <div className="col-span-2 justify-start">Product</div>
                  <div className="justify-self-center">Price</div>
                  <div className="justify-self-center">Quantity</div>
                  <div className="justify-self-end">Total</div>
                </div>
                <div>
                  {orderValue?.cart?.items ? (
                    orderValue.cart.items.map((item) => (
                      <CartItem key={item.product.id} cartProduct={item} />
                    ))
                  ) : (
                    // Handle cases where cartProducts is not an array (e.g., display message, redirect)
                    <div>Cart items not available</div>
                  )}
                </div>
                <div className="m-3 flex justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-2xl font-semibold">
                      <span className="">Total Price:</span>
                      <div className="">
                        {formatPrice(orderValue.orderTotal || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex h-[50vh] w-full items-center justify-center font-mono 
         text-2xl md:text-3xl"
        >
          Loading...
        </div>
      )}
    </>
  );
};

export default OrderDetails;
