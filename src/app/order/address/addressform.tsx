'use client';
import Heading from '@/app/components/Heading/heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/products/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const AddressForm = () => {
  const headTable = ['Street', 'City', 'State', 'Action'];
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
  return (
    <>
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
        onClick={() => {
          router.push('/order/checkout');
        }}
      />
      <p>
        Don&apos;t have an account?
        <Link className="text-blue-300 underline" href="/register">
          {' '}
          Register
        </Link>
      </p>
    </>
  );
};

export default AddressForm;
