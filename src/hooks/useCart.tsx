import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
};

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts)
        console.log("cProducts:", cProducts)
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        let updateCart;
        setCartProducts((prev) => {
            let updateCart;
            if (prev) {
                updateCart = [...prev, product]
            } else {
                updateCart = [product]
            }
            if (updateCart) {

                toast.success(`Added Items To Cart`);
                localStorage.setItem("eShopCartItems", JSON.stringify(updateCart));
            }
            console.log("Done Func")

            return updateCart
        })

    }, [])

    const handleRemoveProductFromCart = useCallback(( product: CartProductType) => {
        console.log("product:", product)
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id)
            setCartProducts(filteredProducts)
            toast.success(`Removed Items To Cart`);
            localStorage.setItem("eShopCartItems", JSON.stringify(filteredProducts));
        }

    }, [cartProducts])
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart
    }
    return <CartContext.Provider value={value} {...props} />
}


export const useCart = () => {
    const context = useContext(CartContext)
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context;
}