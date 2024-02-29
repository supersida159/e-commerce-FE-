import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  cartTotalAmount: number;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);

  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems');
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    let updateCart;
    setCartProducts((prev) => {
      let updateCart;
      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      if (updateCart) {
        toast.success(`Added Items To Cart`);
        localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
      }
      console.log('Done Func');

      return updateCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      console.log('product:', product);
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProducts);
        toast.success(`Removed Items To Cart`);
        localStorage.setItem(
          'eShopCartItems',
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    localStorage.removeItem('eShopCartItems');
    toast.success(`Cleared Items To Cart`);
  }, [cartProducts]);

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity += 1;

          setCartProducts(updateCart);
          localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
        }
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = --updateCart[existingIndex]
            .quantity;

          setCartProducts(updateCart);
          localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
        }
      }
    },
    [cartProducts]
  );

  useEffect(() => {
    // if (cartProducts) {
    //     setCartTotalAmount(cartProducts.reduce((acc: number, product: CartProductType) => acc + product.quantity * product.price, 0))
    //     setCartTotalQty(cartProducts.reduce((acc: number, product: CartProductType) => acc + product.quantity, 0))
    // }
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc: any, item: any) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalAmount(total);
        setCartTotalQty(qty);
      }
    };
    getTotals();
  }, [cartProducts]);
  const value = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleClearCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
