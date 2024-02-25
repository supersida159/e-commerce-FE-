import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null
    cartTotalAmount: number
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleClearCart: () => void
    handleCartQtyChange: (product: CartProductType, qty: number) => void
};

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
        setCartTotalAmount
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

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        console.log("product:", product)
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id)
            setCartProducts(filteredProducts)
            toast.success(`Removed Items To Cart`);
            localStorage.setItem("eShopCartItems", JSON.stringify(filteredProducts));
        }

    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        localStorage.removeItem("eShopCartItems");
        toast.success(`Cleared Items To Cart`);
    }, [cartProducts])

    const cartTotalAmout = useCallback(() => {
        if (cartProducts) {

        }
    }, [cartProducts])
    const handleCartQtyChange = useCallback((product: CartProductType, qty: number) => {
        let updateCart;

        if (product.quantity !== qty) {
            updateCart = { ...cartProducts }
            if (cartProducts) {
                const existingIndex = cartProducts.findIndex(
                    (item) => item.id === product.id
                )
                if (existingIndex > -1) {
                    updateCart[existingIndex].quantity = qty
                }
            }
        }
      

        
    }, [cartProducts])
    const value = {
        cartTotalQty,
        cartProducts,
        cartTotalAmout,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart,
        handleCartQtyChange
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