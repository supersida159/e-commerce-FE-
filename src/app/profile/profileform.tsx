'use client';
import { User } from '@/lib/type/user';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UpdateUserInfor } from '../actions/getProducts';
import AddressForm from '../components/address/addressform';
import { InputEditable } from '../components/inputs/Input';
import Button from '../components/products/button';

type UserProps = {
  user: User | null;
};
const imageStyle = {
  borderRadius: '50%',
  border: '1px solid #fff'
};

const ProfileForm = ({ user }: UserProps) => {
  let avatarUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

  if (user?.avatar) {
    avatarUrl = user.avatar.url;
  }
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editAddresses, setEditAddresses] = useState(false);
  const [defaultaddr, setDefaultaddr] = useState<number>(0);

  useEffect(() => {
    if (user?.address) {
      for (let i = 0; i < user?.address?.length; i++) {
        if (user?.address[i].status === 2) {
          setDefaultaddr(user?.address[i].real_id || 0);
        }
      }
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: ''
    }
  });
  interface UserEdit {
    data: {
      email: string;
      first_name: string;
      last_name: string;
    };
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const token = getCookie('token')?.toString();
    if (!token) return;
    const res = await UpdateUserInfor(data, token);
    toast.success('update success');
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="ma my-3 flex w-1/2 max-w-[800px] flex-col items-center justify-center space-y-5 rounded-2xl bg-slate-300 p-8">
      <InputEditable
        id="email"
        label="Email"
        register={register}
        errors={errors}
        placeholder={user?.email}
        required
      />
      <InputEditable
        id="first_name"
        label="First Name"
        register={register}
        errors={errors}
        required
        placeholder={user?.first_name}
      />
      <InputEditable
        id="last_name"
        label="First Name"
        register={register}
        errors={errors}
        required
        placeholder={user?.last_name}
      />
      <InputEditable
        id="phone"
        label="Your Phone Number"
        register={register}
        errors={errors}
        required
        placeholder={user?.phone?.toString()}
      />
      {editAddresses ? (
        user?.address ? (
          user.address.map((addr) => (
            <AddressForm
              key={addr.real_id}
              address={addr}
              isDefault={addr.real_id === defaultaddr}
              onClick={() => setDefaultaddr(addr?.real_id || 0)}
            />
          ))
        ) : null
      ) : (
        <Button label="Edit Addresses" onClick={() => setEditAddresses(true)} />
      )}
      <Button
        label={isLoading ? 'Loading...' : 'Submit Edit'}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default ProfileForm;
