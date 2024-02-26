'use client'

import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/products/button";
import ProductImage from "@/app/components/products/productImage";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";


interface ProductDeralsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    brand: string,
    category: string,
    description: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number,
}

export type SelectedImgType = {
    color: string
    colorCode: string
    image: string

}
const Horizontal = () => {
    return <hr className="w-[30% my-2]" />
}

const ProductDetails: React.FC<ProductDeralsProps> = ({ product }) => {
    const router = useRouter()
    const { handleAddProductToCart, cartProducts } = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setCardProduct] = useState<CartProductType>(
        {
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            description: product.description,
            selectedImg: { ...product.images[0] },
            quantity: 1,
            price: product.price

        }
    )
    useEffect(() => {
        setIsProductInCart(false);
        if (Array.isArray(cartProducts) && cartProducts?.length) {
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );
            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts])
    const productRating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length
    const handleColorSelect = useCallback((value: SelectedImgType) => {
        if (value === cartProduct.selectedImg) {
            // Color hasn't changed, do nothing
            return;
        }
        setCardProduct((prev) => ({
            ...prev,
            selectedImg: value,
            quantity: 1

        }));
    },
        [cartProduct.selectedImg]);

    const handleQtyIncrease = useCallback(() => {
        setCardProduct((prev) => ({
            ...prev,
            quantity: prev.quantity + 1
        }))
    }, [cartProduct])
    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) return
        setCardProduct((prev) => ({
            ...prev,
            quantity: prev.quantity - 1
        }))
    }, [cartProduct])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} precision={0.5} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold ">CATAGORY : </span>
                    {product.category}
                </div>
                <div>
                    <span className="font-semibold ">Brand : </span>
                    {product.brand}
                </div>
                <div className={product.inStock ? "text-green-500" : "text-red-500"}>{product.inStock ? "In Stock" : "Out of Stock"}</div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                        <p className="flex items-center gap-2"><MdCheckCircle className="text-teal-300" size={20} />
                            <span>Product Added to Cart</span>
                        </p>
                        <div className="max-w-[300px] 
                            ">
                            <Button
                                label="View Cart"
                                outline
                                onClick={() => {
                                    router.push("/cart")
                                }}
                            >

                            </Button>
                        </div>


                    </>
                ) : (
                    <>
                        <div>COLOR</div>
                        <SetColor
                            cartProduct={cartProduct}
                            images={product.images}
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
                                onClick={() => (console.log("clicked"), handleAddProductToCart(cartProduct))}
                            />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default ProductDetails;
