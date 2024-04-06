'use client';
import { getProduct } from '@/app/actions/getProducts';
import ProductDetails from '@/app/product/[productName]/ProductDetails';
import { Product } from '@/lib/type/product';
import { useEffect, useState } from 'react';
interface IParams {
  productName: string;
}
const ProductPage = ({ params }: { params: IParams }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const res = await getProduct(params.productName);
        setProducts(res);
        setLoading(false);
      };
      fetchProduct();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [params.productName]);

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : products ? (
          <ProductDetails products={products} />
        ) : (
          <div>Product not found</div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
