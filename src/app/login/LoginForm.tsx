'use client';
import { useState } from 'react';
import Heading from '../components/Heading/heading';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/inputs/Input';
import Button from '../components/products/button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Heading titlle="Login For E-shop" />
      <Button
        outline
        label="Login with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="h-px w-full bg-slate-300" />

      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? 'Loading...' : 'Login'}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Don't have an account?
        <Link className="text-blue-300 underline" href="/Register">
          {' '}
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
