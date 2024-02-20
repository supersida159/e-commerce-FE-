'use client';

import SetColor from "@/app/components/products/SetColor";
import { Rating } from "@mui/material";
import exp from "constants";
import { useState, useCallback } from "react";


interface ProductDeralsProps{
    product: any
}

export type CardProductType = {
    id: string
    name: string
    brand: string
    category: string
    description: string
    selectedImg: string
    quantity: number
    price: number
}

export type SelectedImgType = {
    color: string
    colorCode: string
    image: string

}
const Horizontal =() => {
    return <hr className="w-[30% my-2]"/>
}

const ProductDetails: React.FC<ProductDeralsProps> = ( {product}) => {
    
    const [cartProduct,setCardProduct] = useState<CardProductType>(
        {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price
        
        }
      )

    const productRating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0)/product.reviews.length
    const handleColorSelect = useCallback((value: SelectedImgType) => { }, 
        [cartProduct.selectedImg]);
    return ( 
        <div className="grid grid=cols-1 md:grid-cols-2 gap-12">
            <div>Images</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} precision={0.5} readOnly />
                    <div>{product.reviews.length} reviews</div>
                    </div>
                    <Horizontal/>
                    <div className="text-justify">
                        {product.description}
                    </div>
                    <Horizontal/>
                    <div>
                        <span className="font-semibold ">CATAGORY : </span>
                        {product.category}
                    </div>
                    <div>
                        <span className="font-semibold ">Brand : </span>
                        {product.brand}
                    </div>
                    <div className={product.inStock ? "text-green-500" : "text-red-500"}>{product.inStock ? "In Stock" : "Out of Stock"}</div>
                    <Horizontal/>
                    <div>COLOR</div>
                    <SetColor 
                    cartProduct={cartProduct}
                    images={product.images} 
                    handleColorSelect= {handleColorSelect}                 
                    />
                    <Horizontal/>
                    <div>QUANTITY</div>
                    <Horizontal/>
                    <div>ADD TO CART</div>
            </div>
        </div>
     );
}
 
export default ProductDetails;

