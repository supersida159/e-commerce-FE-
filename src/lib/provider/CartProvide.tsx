'use client';
import { CartContextProvider } from '../hooks/useCart';
import { UserContextProvider } from '../hooks/useUser';

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return (
    <CartContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </CartContextProvider>
  );
};

export default CartProvider;
