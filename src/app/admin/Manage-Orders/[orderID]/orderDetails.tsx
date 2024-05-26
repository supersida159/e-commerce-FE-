'use client';
import { getOrder, updateOrderAPI } from '@/app/actions/getProducts';
import CartItem from '@/app/cart/CartItem';
import Heading from '@/app/components/Heading/heading';
import { InputEditable } from '@/app/components/inputs/Input';
import Button from '@/app/components/products/button';
import { Order } from '@/lib/type/order';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import formatPrice from '../../../../../utils/formatPrice';

interface OrderDetailsProps {
  orderID: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderID }) => {
  const [orderValue, setOrderValue] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esDate, setEsDate] = useState<string>('');
  const router = useRouter();
  // Function to format the placeholder date

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resOrder = await getOrder(orderID, getCookie('token') as string);
        if (resOrder) {
          setOrderValue(resOrder);
          setEsDate(
            resOrder?.shipping?.EstimatedDelivery?.toString()
              .slice(0, 16)
              .replace('T', ' ') as string
          );
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      customer_name: '',
      customer_phone: '',
      address: {
        street: '',
        city: '',
        state: ''
      },
      shipping: {
        Method: '',
        Cost: 0,
        EstimatedDelivery: ''
      }
    }
  });

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
  const handleUpdateOrder: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // data.shipping.EstimatedDelivery = esDate;
    // const updateData = data;

    const token = getCookie('token');
    data.shipping.EstimatedDelivery = new Date(esDate);
    if (!token) {
      router.push('/login');
    } else {
      const resData = await updateOrderAPI(
        orderID,
        token?.toString(),
        data as Order
      );
      if (resData) {
        console.log('resData', resData);
        setIsLoading(false);
        if (resData == 401) {
          router.push('/login');
        } else if (resData == 200) {
          toast.success('Order Updated');
        }
      }
    }
  };

  // Format the date as yyyy-MM-dd
  return (
    <>
      {orderValue ? (
        <div className="flex flex-grow flex-col items-center justify-center">
          <Heading titlle="OrderDetails" center />

          <div className="w-min-[600px] w-max-[1000px] flex flex-col items-center justify-center rounded-lg border border-slate-700 p-4">
            <div className="grid w-full grid-cols-2">
              <div className="justify-start">Order ID: {orderValue.id}</div>
              <div className="flex justify-start">
                Order Status: {getStatusText(orderValue?.status || 0)}
              </div>
            </div>
            <div className="grid w-full grid-cols-2 p-2">
              <InputEditable
                id="customer_name"
                label="Customer Name"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.customer_name}
              />
              <InputEditable
                id="customer_phone"
                label="Customer Phone"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.customer_phone}
              />
            </div>
            <div className="grid w-full grid-cols-3 p-2">
              <InputEditable
                id="address.city"
                label="Customer City"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.address?.city}
              />

              <InputEditable
                id="address.state"
                label="Customer State"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.address?.state}
              />
              <InputEditable
                id="address.street"
                label="Customer Street"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.address?.street}
              />
            </div>
            <div className="grid w-full grid-cols-2 p-2">
              <InputEditable
                id="shipping.Method"
                label="Shipping Medthod"
                register={register}
                type="string"
                errors={errors}
                placeholder={orderValue?.shipping?.Method}
              />
              <InputEditable
                id="shipping.EstimatedDelivery"
                label=" Estimated Delivery"
                register={register}
                type="datetime-local"
                errors={errors}
                value={esDate}
                onchange={(e) => {
                  setEsDate(e.target.value);
                }}
              />
            </div>
            <div>
              <Button
                label="Submit Update"
                outline
                onClick={handleSubmit(handleUpdateOrder)}
              ></Button>
            </div>
          </div>

          {/* Order Details Here  */}
          <div className="w-min-[800px] w-max-[1200px] mx-auto mt-5 rounded-2xl border border-slate-600">
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
              <div className="mt-3 flex justify-between">
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OrderDetails;
