
'use client';

import { CardProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
    images: SelectedImgType[],
    cartProduct: CardProductType,
    handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: React.FC<SetColorProps> = ({images, cartProduct, handleColorSelect: handColorSelected}) => {
    return ( 
    <div>
        <div className="flex gap-4 items-center">
            <span className="font-semibold">Color : </span>
            <div className="flex gap-2">{images.map((image) =>{
                return (
                    <div 
                    key={image.color}
                    onClick={() => handColorSelected(image)}
                    className={
                        `h-7 w-7 rounded-full border-teal-300 flex items-center justify-center 
                        ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`
                    }>
                        
                    </div>
                )
            }
            )
        }</div>
        </div>
    </div> );
}
 
export default SetColor;