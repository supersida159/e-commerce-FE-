'use client';

import { Login, getUserInfor } from '@/api/fetch';
import { useCart } from '@/lib/hooks/useCart';
import { useUser } from '@/lib/hooks/useUser';
import { User } from '@/lib/type/user';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineGoogle } from 'react-icons/ai';
import { getCart, updateCartItem } from '../actions/getProducts';
import Heading from '../components/Heading/heading';
import Input from '../components/inputs/Input';
import Button from '../components/products/button';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);
  const router = useRouter();
  const { handleSetUser } = useUser();
  const { handleAddProductToCart, cartProducts, handleSetCartProducts } =
    useCart();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  interface LoginData {
    data: {
      access_token: {
        access_token: string;
        created: string;
        expire: number;
      };
      refresh_token: {
        access_token: string;
        created: string;
        expire: number;
      };
    };
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    toast
      .promise(
        Login(data.email, data.password, 'user/login').then(async (resData) => {
          if (typeof resData === 'number') {
            throw new Error('Wrong email or password');
          } else if (!resData) {
            throw new Error('Fetching data error');
          }
          const accessToken = resData?.data.access_token.access_token;

          if (accessToken) {
            setErr(null);
            setCookie('token', accessToken);
            const resUser = await getUserInfor();
            if (resUser) {
              handleSetUser(resUser.data as User);
              if (cartProducts) {
                for (const product of cartProducts) {
                  await updateCartItem(product, accessToken);
                }
              }
              const res = await getCart(accessToken);
              if (res) {
                handleSetCartProducts(res.items);
                localStorage.setItem(
                  'eShopCartItems',
                  JSON.stringify(res.items)
                );
              }
            }
            router.push('/');
          }
        }),
        {
          loading: 'Logging in...',
          success: 'Logged in successfully!',
          error: 'Could not log in.'
        }
      )
      .catch((error) => {
        setErr(new Error(error.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading titlle="Login For E-shop" />
      <Button
        outline
        label="Login with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          toast.error('Login with Google account is under construction');
        }}
      />
      <hr className="h-px w-full bg-slate-300" />
      <label
        htmlFor=""
        className={`text-center text-red-500 ${err ? '' : 'hidden'}`}
      >
        {err?.message}
      </label>
      <Input
        id="email"
        label="Email"
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
        Don&apos;t have an account?
        <Link className="text-blue-300 underline" href="/register">
          {' '}
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
