 'use client'

import Image from "next/image";
import React from "react";
import { truncateText } from "../../../../utils/truncateText";
import formatPrice from "../../../../utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

 interface ProductCardProps{
    data: any
 }
const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    const router = useRouter();
    const productRating = data.reviews.reduce((acc: number, review: any) => acc + review.rating, 0)/data.reviews.length
    return ( 
        
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    onClick={() => router.push(`/product/${data.id}`)}
    >
        <div className="flex flex-col items-center w-full gap-1">
            <div className="aspect-square overflow-hidden relative w-full">
                <Image
                fill
                src={data.images[0].image} 
                alt={data.name} 
                className="w-full h-full object-contain"/>
            </div>
            <div className="mt-4">
            <p>{truncateText(data.name)}</p>
            </div>
            <div>
            <Rating value={productRating} precision={0.5} readOnly />
            </div>
            <div>
            {data.reviews.length} reviews
            </div>
            <div className="font-semibold">
                {formatPrice(data.price)}
            </div>

        </div>
    </div> );
}
 
export default ProductCard;