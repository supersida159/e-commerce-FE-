import Container from "@/app/components/nav/Container"
import ProductDetails from "@/app/product/[productId]/ProductDetails"
import { product } from "../../../../utils/product"
interface IParams {
    productId: string
}
const Product = ({params}:{params: IParams}) => {
    console.log("params", params)
    return ( 
        <div>
            <Container>
                <ProductDetails product={product}/>
            </Container>
        </div>
     );
}
 
export default Product;