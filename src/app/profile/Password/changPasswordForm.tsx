'use client';

import { UpdateUserInfor } from '@/app/actions/getProducts';
import Heading from '@/app/components/Heading/heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/products/button';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const localToken = getCookie('token');
    if (!localToken) {
      toast.error('Please login first!');
      router.push('/login');
    } else {
      setToken(localToken);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.new_password !== data.confirm_password) {
      setErr(new Error('Passwords do not match'));
      return;
    }

    setIsLoading(true);
    setErr(null);

    if (!token) {
      setErr(new Error('your must login first'));
      toast.error('your must login first');
      router.push('/login');
    } else {
      toast
        .promise(
          UpdateUserInfor(data, token).then((resData) => {
            if (resData !== 200) {
              setErr(
                new Error('Wrong password or password are the same as old')
              );
              throw new Error('Wrong email or password');
            }
            return resData;
          }),
          {
            loading: 'Saving...',
            success: 'Settings saved!',
            error: 'Could not save.'
          }
        )
        .then(() => {
          router.push('/login');
        })
        .catch((error) => {
          setErr(new Error(error.message));
        })
        .finally(() => {
          setIsLoading(false);
          reset();
        });
    }
  };

  return (
    <>
      {token ? (
        <>
          <Heading titlle="Change Your Password" />
          <hr className="h-px w-full bg-slate-300" />
          {err && (
            <label className="text-center text-red-500">{err.message}</label>
          )}
          <Input
            id="password"
            label="Your Current Password"
            register={register}
            errors={errors}
            type="password"
            required
          />
          <Input
            id="new_password"
            label="New Password"
            register={register}
            errors={errors}
            required
            type="password"
          />
          <Input
            id="confirm_password"
            label="Confirm Your Password"
            register={register}
            errors={errors}
            required
            type="password"
          />
          <Button
            label={isLoading ? 'Loading...' : 'Submit'}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          />
        </>
      ) : null}
    </>
  );
};

export default ChangePasswordForm;
