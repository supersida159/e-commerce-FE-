'use client';

import { Product } from '@/lib/type/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import formatPrice from '../../../../utils/formatPrice';
import { truncateText } from '../../../../utils/truncateText';

interface ProductCardProps {
  data: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  // const productRating =
  //   data.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) /
  //   data.reviews.length;
  return (
    <div
      className="col-span-1 cursor-pointer rounded-sm border-[1.2px] border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
      onClick={() => router.push(`/product/${data.name}`)}
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            fill
            src={data.images.image.url}
            alt={data.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-4">
          <p>{truncateText(data.name)}</p>
        </div>
        <div>
          <p>Quantity : {data.quantity}</p>
        </div>
        {/* <div>
          <Rating value={productRating} precision={0.5} readOnly />
        </div> */}
        {/* <div>{data.reviews.length} reviews</div> */}
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
