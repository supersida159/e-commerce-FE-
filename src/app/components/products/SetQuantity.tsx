'use client'

import { CardProductType } from "@/app/product/[productId]/ProductDetails"

interface SetQuantityProps {
    cartCounter?: boolean
    cartProduct: CardProductType
    handleQtyIncrease: () => void
    handleQtyDecrease: () => void
}
const btcStyles ='border-[1.2px] border-slate-300 px-2 rounded cursor-pointer'
const  SetQuantity: React.FC<SetQuantityProps> = ( { cartCounter, cartProduct, handleQtyIncrease, handleQtyDecrease }) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : <div 
            className="font-semibold">Quantity : </div>}
            <div className="flex gap-4 items-center text-base">
                <button className={btcStyles} onClick={handleQtyDecrease}>-</button>
                <div>{cartProduct.quantity}</div>
                <div className={btcStyles} onClick={handleQtyIncrease}>+</div>
            </div>
        </div>
    );
}
 
export default  SetQuantity;