'use client';
import { getOrder, updateOrder } from '@/app/actions/getProducts';
import Heading from '@/app/components/Heading/heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/products/button';
import { Order } from '@/lib/type/order';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface orderProps {
  orderID: string;
}
const AddressForm: React.FC<orderProps> = ({ orderID }) => {
  const headTable = ['Street', 'City', 'State', 'Action'];
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const resOrder = async () => getOrder(orderID, getCookie('token') as string);
  const [countdown, setCountdown] = useState(600);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resOrder = await getOrder(orderID, getCookie('token') as string);
        if (resOrder) {
          // Calculate remaining time in seconds
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          const orderCreatedAt = Math.floor(
            resOrder.created_at
              ? new Date(resOrder.created_at).getTime() / 1000
              : 0
          );
          const remainingTime = Math.max(
            0,
            600 - (currentTime - orderCreatedAt)
          ); // Remaining time in seconds, capped at 0

          // Update countdown
          setCountdown(remainingTime);

          // Schedule next update (optional)
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
      Name: '',
      City: '',
      State: '',
      Street: '',
      PhoneNumber: 0
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    console.log('orderID:', orderID);
    const orderaddress: Order = {
      address: {
        street: data.Street, // Assuming your input field IDs are 'Street', 'City', 'State'
        city: data.City,
        state: data.State
      },
      customer_name: data.Name,
      customer_phone: data.PhoneNumber
    };
    const token = getCookie('token');
    if (token !== undefined) {
      const token = getCookie('token');
      const res = await updateOrder(orderID, token as string, orderaddress);
      console.log('res:', res);
      if (res == '200') {
        router.push('/order/payment/' + orderID);
      } else if (res == '401') {
        deleteCookie('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    // const url  = "/order/payment" + Resproducts?.data?.id
    router.push('/order/payment/' + orderID);
  };

  useEffect(() => {
    if (countdown != 600) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <>
      <Heading
        titlle={
          countdown === 600
            ? ''
            : countdown <= 0
              ? 'Your Order is Expired'
              : `We keep your order in ${minutes}:${seconds}`
        }
        classname="text-center text-blue-600"
      />
      <Heading titlle="Add Your Address" />

      <hr className="h-px w-full bg-slate-300" />

      <div className="flex w-full">
        <Input
          id="Name"
          label="Name"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="PhoneNumber"
          label="PhoneNumber"
          register={register}
          errors={errors}
          required
          type="number"
        />
      </div>
      <div className="flex w-full">
        <Input
          id="City"
          label="City"
          register={register}
          errors={errors}
          required
          type="text"
        />
        <Input
          id="Stat"
          label="State"
          register={register}
          errors={errors}
          required
          type="text"
        />
      </div>
      <Input
        id="Street"
        label="Street"
        register={register}
        errors={errors}
        required
        type="text"
      />
      <Button
        label={isLoading ? 'Loading...' : 'Check Out'}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddressForm;
