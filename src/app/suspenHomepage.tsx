/* eslint-disable react/no-unescaped-entities */
'use client';
import { Product } from '@/lib/type/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducts } from './actions/getProducts';
import Container from './components/nav/Container';
import HomeBanner from './components/nav/HomeBanner';
import ProductCard from './components/products/ProductCard';

export default function SuspenHome() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const params = useSearchParams();
  const category = params?.get('category');
  const searchTerm = params?.get('searchTerm');

  useEffect(() => {
    const fetchProducts = async () => {
      let reqdata = {};

      if (category) {
        if (searchTerm) {
          reqdata = {
            category: category,
            searchTerm: searchTerm
          };
        } else {
          reqdata = {
            category: category
          };
        }
      } else if (searchTerm) {
        reqdata = {
          searchTerm: searchTerm
        };
      }

      try {
        const res = await getProducts(reqdata);
        if (res) {
          setProducts(res.data);
          setLoading(false); // Set loading to false when products are fetched successfully
        } else {
          throw new Error('Error fetching products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false on error
      }
    };
    fetchProducts();
  }, [category, searchTerm]);

  return (
    <div className="p-8">
      <Container>
        {loading ? ( // Render loading message when loading is true
          <div>Loading...</div>
        ) : products && products.length > 0 ? (
          <>
            <HomeBanner />
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {products.map((product, index) =>
                // Render the ProductCard for the first product or if the current product's name is different from the previous product's name
                index === 0 || product.name !== products[index - 1].name ? (
                  <ProductCard key={product.id} data={product} />
                ) : null
              )}
            </div>
          </>
        ) : (
          <div
            className="flex h-[50vh] w-full items-center justify-center font-mono 
               text-2xl md:text-3xl"
          >
            Oops! No product found. Click &apos;All&apos; to see all products
          </div>
        )}
      </Container>
    </div>
  );
}
