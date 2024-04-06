import { CartProductType } from '@/app/product/[productName]/ProductDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
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
  // handleUploadCart: (products: CartProductType[]) => void;
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
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        // Check if the product already exists in the cart
        const existingProductIndex = prev.findIndex(
          (item) => item.product.id === product.product.id
        );
        if (existingProductIndex > -1) {
          // If the product already exists, update its quantity
          const updatedProduct = {
            ...prev[existingProductIndex],
            quantity: prev[existingProductIndex].quantity + 1
          };
          updatedCart = [
            ...prev.slice(0, existingProductIndex),
            updatedProduct,
            ...prev.slice(existingProductIndex + 1)
          ];
          toast.success(`Added quantity to cart`);
        } else {
          // If the product is not in the cart, add it with a quantity of 1
          updatedCart = [...prev, { ...product, quantity: product.quantity }];
          toast.success(`Added item to cart`);
        }
      } else {
        // If the cart is empty, add the product with a quantity of 1
        updatedCart = [{ ...product, quantity: 1 }];
        toast.success(`Added item to cart`);
      }
      // Update local storage with the updated cart
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      console.log('Done Func');
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      console.log('product:', product);
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.product.id !== product.product.id
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
          (item) => item.product.id === product.product.id
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
          (item) => item.product.id === product.product.id
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
            const itemTotal = item.product.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0
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
    handleCartQtyDecrease
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
