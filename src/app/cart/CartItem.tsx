'use client';

import { useCart } from '@/lib/hooks/useCart';
import formatPrice from '../../../utils/formatPrice';
import { truncateText } from '../../../utils/truncateText';
import SetQuantity from '../components/products/SetQuantity';
import { CartProductType } from '../product/[productId]/ProductDetails';

interface CartItemProps {
  cartProduct: CartProductType;
}

const CartItem: React.FC<CartItemProps> = ({ cartProduct: item }) => {
  const btcStyles =
    'border-[1.2px] border-slate-300 px-2 rounded cursor-pointer';
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease
  } = useCart();

  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-2 flex justify-items-start gap-2 md:gap-4 ">
        <a href={`product/${item.id}`}>
          <div className="relative aspect-square w-[70px] ">
            <img src={item.selectedImg.image} alt={item.name} />
          </div>
        </a>
        <div className="flex flex-col gap-1">
          <a href={`product/${item.id}`}> {truncateText(item.name)}</a>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {formatPrice(item.price)}
      </div>
      <div className="flex items-center justify-center ">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="flex items-center justify-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
