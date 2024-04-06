'use client';

import { CartProductType } from '@/app/product/[productName]/ProductDetails';
import { Product } from '@/lib/type/product';

interface SetColorProps {
  products: Product[];
  cartProduct: CartProductType;
  handleColorSelect: (value: Product) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  products: products,
  cartProduct,
  handleColorSelect
}) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">Color : </span>
        <div className="flex gap-1">
          {products.map((product) => {
            return (
              <div
                key={product.images.color}
                onClick={() => handleColorSelect(product)}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-teal-300 
                        ${
                          cartProduct.product.images.color ===
                          product.images.color
                            ? 'border-[1.5px]'
                            : 'border-none'
                        }`}
              >
                <div
                  style={{ backgroundColor: product.images.color }}
                  className="h-5 w-5 cursor-pointer rounded-full border-[1.2px]
                        border-slate-300"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
