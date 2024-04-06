'use client';

import { CartProductType } from '@/app/product/[productName]/ProductDetails';

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
const btcStyles = 'border-[1.2px] border-slate-300 px-2 rounded cursor-pointer';
const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease
}) => {
  return (
    <div className="flex items-center justify-center gap-8">
      {cartCounter ? null : <div className="font-semibold">Quantity : </div>}
      <div className="flex items-center gap-4 text-base ">
        <button className={btcStyles} onClick={handleQtyDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <div className={btcStyles} onClick={handleQtyIncrease}>
          +
        </div>
      </div>
    </div>
  );
};

export default SetQuantity;
