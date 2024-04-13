'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineGoogle } from 'react-icons/ai';
import { registerAPI } from '../actions/getProducts';
import Heading from '../components/Heading/heading';
import Input from '../components/inputs/Input';
import Button from '../components/products/button';

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      first_name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await registerAPI(data.first_name, data.email, data.password);
    if (!res.error) {
      console.log('register:', res.data);
      toast.success('Register success!');
      reset();
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      toast.error('Register fail!');
      toast.error(res.error);
      console.log('error:', res.error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Heading titlle="Sign Up For E-shop" />
      <Button
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="h-px w-full bg-slate-300" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
        type="email"
      />
      <Input
        id="first_name"
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
        label={isLoading ? 'Loading...' : 'Sign Up'}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Already have an account?
        <Link className="text-blue-300 underline" href="/login">
          {' '}
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
