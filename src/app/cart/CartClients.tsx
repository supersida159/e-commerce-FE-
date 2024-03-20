'use client';

import { useCart } from '@/lib/hooks/useCart';
import { MdArrowBack } from 'react-icons/md';
import formatPrice from '../../../utils/formatPrice';
import Heading from '../components/Heading/heading';
import Button from '../components/products/button';
import CartItem from './CartItem';

const CartClients = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <a href="/" className="mt-2 flex items-center gap-1">
            <MdArrowBack />
            <span>Continue shopping</span>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex max-w-[1920px] flex-col px-4 md:px-4 xl:px-20">
        <Heading titlle="shopping Cart" center />
        <div className="mt-8 grid grid-cols-5">
          <div className="col-span-2 justify-start">Product</div>
          <div className="justify-self-center">Price</div>
          <div className="justify-self-center">Quantity</div>
          <div className="justify-self-end">Total</div>
        </div>
        <div>
          {Array.isArray(cartProducts) ? (
            cartProducts.map((item) => (
              <CartItem key={item.id} cartProduct={item} />
            ))
          ) : (
            // Handle cases where cartProducts is not an array (e.g., display message, redirect)
            <div>Cart items not available</div>
          )}
        </div>
        <div className="mt-3 flex justify-between">
          <div>
            <Button
              custom="w-[100px] "
              label="Clear Cart"
              outline
              small
              onClick={() => handleClearCart()}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-2xl font-semibold">
              <span className="">Subtotal</span>
              <div className="">{formatPrice(cartTotalAmount)}</div>
            </div>
            <div className="">Taxes and shipping calculated at checkout</div>
            <div>
              <Button
                label="Checkout"
                outline
                onClick={() => handleClearCart()}
              ></Button>
            </div>
            <div>
              <a href="/" className="mt-2 flex items-center gap-1">
                <MdArrowBack />
                <span>Continue shopping</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartClients;
