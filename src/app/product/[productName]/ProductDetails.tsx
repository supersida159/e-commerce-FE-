'use client';

import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import Button from '@/app/components/products/button';
import ProductImage from '@/app/components/products/productImage';
import { useCart } from '@/lib/hooks/useCart';
import { useUser } from '@/lib/hooks/useUser';
import { Cartitem } from '@/lib/type/order';
import { Product } from '@/lib/type/product';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';

interface ProductDetailsProps {
  products: Product[];
}

const Horizontal = () => {
  return <hr className="w-[30% my-2]" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
  const router = useRouter();
  const { user } = useUser();

  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<Cartitem>({
    product: products[0],
    quantity: 1
  });

  // useEffect(() => {
  //   if (Array.isArray(cartProducts) && cartProducts?.length) {
  //     const existingIndex = cartProducts.findIndex(
  //       (item) => item.product.id === cartProduct.product.id
  //     );
  //     if (existingIndex > -1) {
  //       setIsProductInCart(true);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   setIsProductInCart(false);
  //   if (Array.isArray(cartProducts) && cartProducts?.length) {
  //     const existingIndex = cartProducts.findIndex(
  //       (item) => item.product.id === products[0]?.id
  //     );
  //     if (existingIndex > -1) {
  //       setIsProductInCart(true);
  //     }
  //   }
  // }, [cartProducts]);
  // const productRating =
  //   product.reviews.reduce(
  //     (acc: number, review: any) => acc + review.rating,
  //     0
  //   ) / product.reviews.length;
  const handleColorSelect = useCallback(
    (value: Product) => {
      if (value === cartProduct.product) {
        // Color hasn't changed, do nothing
        return;
      }
      setCartProduct((prev) => ({
        ...prev,
        product: value,
        quantity: 1
      }));
    },
    [cartProduct]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1
    }));
  }, []);
  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 1) return prev;
      return {
        ...prev,
        quantity: prev.quantity - 1
      };
    });
  }, []);
  useEffect(() => {
    if (user != null) {
      //update cart
      return;
    }
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <ProductImage
        cartProduct={cartProduct}
        products={products}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">
          {products[0].name}
        </h2>
        {/* <div className="flex items-center gap-2">
          <Rating value={productRating} precision={0.5} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div> */}
        <Horizontal />
        <div className="text-justify">{products[0].description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold ">CATAGORY : </span>
          {products[0].category}
        </div>
        <div>
          <span className="font-semibold ">Brand : </span>
          {products[0].brand}
        </div>
        <div className={products[0].active ? 'text-green-500' : 'text-red-500'}>
          {products[0].active ? 'In Stock' : 'Out of Stock'}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="flex items-center gap-2">
              <MdCheckCircle className="text-teal-300" size={20} />
              <span>Product Added to Cart</span>
            </p>
            <div
              className="max-w-[300px] 
                            "
            >
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push('/cart');
                }}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2">
              <div>COLOR:</div>
              <div
                style={{ color: cartProduct.product.images.colorCode }}
                // className={`text-[${cartProduct.product.images.colorCode}] `}
              >
                {cartProduct.product.images.color}
              </div>
            </div>
            <SetColor
              cartProduct={cartProduct}
              products={products}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-80	">
              <Button
                label="Add to Cart"
                onClick={() => (
                  console.log('clicked'), handleAddProductToCart(cartProduct)
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
