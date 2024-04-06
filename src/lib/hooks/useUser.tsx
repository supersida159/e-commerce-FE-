import { getUserInfor } from '@/api/fetch';
import { getCookie } from 'cookies-next';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../type/user';
import { useCart } from './useCart';

type UserContext = {
  user: User | null;
  token: string | undefined;
  handleSetUser: (user: User) => void; // Fix the typo here
};

export const UserContext = createContext<UserContext | null>(null);

interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>();
  const { cartProducts } = useCart();

  const handleSetUser = (newUser: User) => {
    setUser(newUser);
    console.log(newUser);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');
      if (token && token !== 'undefined') {
        try {
          const userinfor = await getUserInfor();
          if (userinfor) {
            handleSetUser(userinfor.data as User);
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    };

    setToken(getCookie('token'));
    fetchData();
  }, []);
  // upload DB when cart change
  useEffect(() => {
    if (user) {
      if (cartProducts) {
        handleSetUser({ ...user, cart: cartProducts });
      }
    }
  }, [cartProducts]);

  const value = { user, handleSetUser, token }; // Fix the typo here

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
