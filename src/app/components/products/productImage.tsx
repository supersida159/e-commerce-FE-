'use client';

import { Cartitem } from '@/lib/type/order';
import { Product } from '@/lib/type/product';
import Image from 'next/image';

interface ProductImageProps {
  cartProduct: Cartitem;
  products: Product[];
  handleColorSelect: (value: Product) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  products,
  handleColorSelect
}) => {
  return (
    <div
      className="grid
        h-full
        max-h-[500px]
        min-h-[300px]
        grid-cols-6
        gap-2
        sm:min-h-[400px]
        "
    >
      <div
        className="
        flex
        h-full
        max-h-[500px]
        min-h-[300px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-4
        border
        sm:min-h-[400px]
        "
      >
        {products.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => handleColorSelect(product)}
              className={`relative aspect-square w-[80%] rounded border-teal-300
                    ${cartProduct.product.id === product.id ? 'border-[1.5px]' : 'border-none'}`}
            >
              <Image
                src={product.images.image.url}
                alt={product.images.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="relative col-span-5 aspect-square">
        <Image
          fill
          src={cartProduct.product.images.image.url}
          alt={cartProduct.product.name}
          className="
            max-h-[500px]
            min-h-[300px]
            w-full
            object-contain
            sm:min-h-[400px]
            "
        />
      </div>
    </div>
  );
};

export default ProductImage;
