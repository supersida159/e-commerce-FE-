import { Rating } from "@mui/material";

`user client`;
interface ProductDeralsProps{
    product: any
}

const Horizontal =() => {
    return <hr className="w-[30% my-2]"/>
}

const ProductDetails: React.FC<ProductDeralsProps> = ( {product}) => {
    const productRating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0)/product.reviews.length
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
                    <Horizontal/>
                    <div>QUANTITY</div>
                    <Horizontal/>
                    <div>ADD TO CART</div>
            </div>
        </div>
     );
}
 
export default ProductDetails;