'use client'

import { useCart } from "@/hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading/heading";
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
            <div className="flex flex-col">
                <Heading titlle="shopping Cart"  center/>
            </div>
        );
    }

}

export default CartClients;