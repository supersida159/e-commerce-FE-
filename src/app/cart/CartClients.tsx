'use client'

import { useCart } from "@/hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading/heading";
import CartItem from "./CartItem";
import Button from "../components/products/button";

const CartClients = () => {
    const { cartProducts, handleClearCart } = useCart();
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <a href="/" className="flex gap-1 items-center mt-2">
                        <MdArrowBack />
                        <span>Continue shopping</span>
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col max-w-[1920px] mx-auto xl:px-20 md:px-4 px-4">
                <Heading titlle="shopping Cart" center />
                <div className="grid grid-cols-5 mt-8">
                    <div className="col-span-2 justify-start">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total</div>
                </div>
                <div>
                    {cartProducts.map((items) => (
                        <CartItem cartProduct={items} />
                    ))}
                </div>
                <div className="flex mt-3 justify-between">
                    <div>
                        <Button custom="w-[100px] " label="Clear Cart" outline small onClick={() => handleClearCart()} />
                    </div>
                    <div>
                        <div className="justify-between flex items-center mb-2 text-2xl font-semibold">
                            <span className="">Subtotal</span>
                            <div className="">Total</div>
                        </div>
                        <div className="">Taxes and shipping calculated at checkout</div>
                        <div>
                            <Button label="Checkout" outline onClick={() => handleClearCart()}></Button>
                        </div>
                        <div>
                            <a href="/" className="flex gap-1 items-center mt-2">
                                <MdArrowBack />
                                <span>Continue shopping</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CartClients;