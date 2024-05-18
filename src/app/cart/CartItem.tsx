/* eslint-disable @next/next/no-img-element */
'use client';

import { useCart } from '@/lib/hooks/useCart';
import { Cartitem } from '@/lib/type/order';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import formatPrice from '../../../utils/formatPrice';
import { truncateText } from '../../../utils/truncateText';
import { updateCartItem } from '../actions/getProducts';
import SetQuantity from '../components/products/SetQuantity';

interface CartItemProps {
  cartProduct: Cartitem;
}

const CartItem: React.FC<CartItemProps> = ({ cartProduct: item }) => {
  const btcStyles =
    'border-[1.2px] border-slate-300 px-2 rounded cursor-pointer';
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease
  } = useCart();
  const router = useRouter();

  const removeItemHandler = async (item: Cartitem) => {
    handleRemoveProductFromCart(item);

    const token = getCookie('token');
    let cartquantity = 0;
    const subcart = { ...item };
    subcart.quantity = 0;

    if (token) {
      const data = await updateCartItem(subcart, token);
      console.log('data', data);

      if (data == 400) {
        router.push('/login');
        deleteCookie('token');
      } else if (data == 200) {
        handleRemoveProductFromCart(item);
      }
    } else {
      handleRemoveProductFromCart(item);
    }
  };

  const increaseItemhandler = async (item: Cartitem) => {
    const token = getCookie('token');
    let cartquantity = 0;
    let subcart = { ...item };
    subcart.quantity = item.quantity + 1;

    if (token) {
      const data = await updateCartItem(subcart, token);
      console.log('data', data);

      if (data == 400) {
        router.push('/login');
        deleteCookie('token');
      } else if (data == 200) {
        handleCartQtyIncrease(subcart);
      }
    } else {
      handleCartQtyIncrease(subcart);
    }
  };

  const decreaseItemhandler = async (item: Cartitem) => {
    const token = getCookie('token');
    let cartquantity = 0;
    let subcart = { ...item };
    subcart.quantity = item.quantity - 1;

    if (subcart.quantity > 0) {
      if (token) {
        const data = await updateCartItem(subcart, token);
        console.log('data', data);

        if (data == 400) {
          router.push('/login');
          deleteCookie('token');
        } else if (data == 200) {
          handleCartQtyDecrease(item);
        }
      } else {
        handleCartQtyDecrease(item);
      }
    } else {
      removeItemHandler(item);
    }
  };

  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-2 flex justify-items-start gap-2 md:gap-4 ">
        <a href={`product/${item.product.name}`}>
          <div className="relative aspect-square w-[70px] ">
            <img src={item.product.images.image.url} alt={item.product.name} />
          </div>
        </a>
        <div className="flex flex-col gap-1">
          <a href={`product/${item.product.name}`}>
            {' '}
            {truncateText(item.product.name)}
          </a>
          <div>{item.product.images.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => removeItemHandler(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {formatPrice(item.product.price)}
      </div>
      <div className="flex items-center justify-center ">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => increaseItemhandler(item)}
          handleQtyDecrease={() => decreaseItemhandler(item)}
        />
      </div>
      <div className="flex items-center justify-end">
        {formatPrice(item.product.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
