'use client'

import { useCart } from "@/hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading/heading";
import CartItem from "./CartItem";

const CartClients = () => {
    const { cartProducts } = useCart();
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
                <Heading titlle="shopping Cart"  center />
                <div className="grid grid-cols-5 mt-8">
                    <div className="col-span-2 justify-start">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total</div>
                </div>
                <div>
                    {cartProducts.map((items) => (
                        <CartItem cartProduct={items}  />
                    ))}
                </div>
            </div>
        );
    }

}

export default CartClients;