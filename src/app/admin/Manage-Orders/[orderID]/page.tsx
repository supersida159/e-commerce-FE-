interface IParams {
  productId: string;
}

const Product = ({ params }: { params: IParams }) => {
  return (
    <div>
      <div>
        {products.map((product: any) => {
          if (product.id === params.productId) {
            return <ProductDetails product={product} />;
          }
        })}
      </div>
    </div>
  );
};

export default Product;
