'use client';
import { useCart } from '@/lib/hooks/useCart';
import { useRouter } from 'next/navigation';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push('/cart')}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span
        className={` absolute
            right-[-10px]
            top-[-10px]
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-slate-600
            text-sm
            text-white
            ${cartTotalQty > 0 ? 'inline-block' : 'hidden'}
            `}
      >
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
