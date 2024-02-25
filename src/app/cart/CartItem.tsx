'use client'

import { truncate } from "fs";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { truncateText } from "../../../utils/truncateText";
import formatPrice from "../../../utils/formatPrice";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
    cartProduct: CartProductType
}

const CartItem: React.FC<CartItemProps> = ({ cartProduct }) => {

    const { handleRemoveProductFromCart } = useCart();

    return (
        <div className="grid grid-cols-5 ">
            <div className="flex gap-2 md:gap-4 col-span-2 justify-items-start ">
                <a href={`product/${cartProduct.id}`}>
                    <div className="relative w-[70px] aspect-square ">
                        <img src={cartProduct.selectedImg.image} alt={cartProduct.name} />
                    </div>
                </a>
                <div className="flex flex-col gap-1">
                    <a href={`product/${cartProduct.id}`}> {truncateText(cartProduct.name)}</a>
                    <div>{cartProduct.selectedImg.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(cartProduct)}>Remove</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CartItem;