'use client'

import { truncate } from "fs";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { truncateText } from "../../../utils/truncateText";
import formatPrice from "../../../utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import SetQuantity from "../components/products/SetQuantity";

interface CartItemProps {
    cartProduct: CartProductType
}

const CartItem: React.FC<CartItemProps> = ({ cartProduct }) => {
    const btcStyles = 'border-[1.2px] border-slate-300 px-2 rounded cursor-pointer'
    const { handleRemoveProductFromCart,handleCartQtyDecrease,handleCartQtyIncrease } = useCart();

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
            <div>{formatPrice(cartProduct.price)}</div>
            <div>
                <SetQuantity 
                cartCounter={true}
                cartProduct={cartProduct} 
                handleQtyIncrease={() => handleCartQtyIncrease(cartProduct)} 
                handleQtyDecrease={() => handleCartQtyDecrease(cartProduct)}/>
            </div>

        </div>
    );
}

export default CartItem;