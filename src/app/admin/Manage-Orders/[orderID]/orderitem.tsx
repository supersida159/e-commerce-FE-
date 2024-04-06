/* eslint-disable @next/next/no-img-element */
import { ProductQuantity } from '@/lib/type/order';
import formatPrice from '../../../../../utils/formatPrice';
import { truncateText } from '../../../../../utils/truncateText';

const OrderItem: React.FC<{ productQty: ProductQuantity }> = ({
  productQty
}) => {
  return (
    // <div className="grid grid-cols-5 ">
    //   <div className="col-span-2 flex items-center justify-start gap-2 md:gap-4 ">
    //     <Link href={`/product/${productQty.product.id}`}>
    //       <div className="relative aspect-square w-[70px]">
    //         <img
    //           src={
    //             productQty.product.images &&
    //             productQty.product.images.length > 0
    //               ? productQty.product.images[0]?.image?.url
    //               : 'https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image-300x225.jpg'
    //           }
    //           alt={productQty.product.name}
    //         />
    //       </div>
    //     </Link>
    //     <div className="flex flex-col gap-1">
    //       <Link href={`/product/${productQty.product.id}`}>
    //         {truncateText(productQty.product.name)}
    //       </Link>
    //       <div>
    //         {productQty.product.images
    //           ? productQty.product.images[0].color
    //           : 'undified'}
    //       </div>
    //       <div className="w-[70px]"></div>
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-center">
    //     {formatPrice(productQty.product.price)}
    //   </div>
    //   <div className="flex items-center justify-center">
    //     Product Quantity: {productQty.quantity}
    //   </div>
    //   <div className="flex items-center justify-end">
    //     {formatPrice(productQty.product.price * productQty.quantity)}
    //   </div>
    // </div>

    <div className="grid grid-cols-5 ">
      <div className="col-span-2 flex justify-items-start gap-2 md:gap-4 ">
        <a href={`/product/${productQty.product.id}`}>
          <div className="relative aspect-square w-[70px] ">
            <img
              src={
                productQty.product.images &&
                productQty.product.images.length > 0
                  ? productQty.product.images[0]?.image?.url
                  : 'https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image-300x225.jpg'
              }
              alt={productQty.product.name}
            />
          </div>
        </a>
        <div className="flex flex-col gap-1">
          <a href={`product/${productQty.product.id}`}>
            {' '}
            {truncateText(productQty.product.name)}
          </a>
          <div>
            {' '}
            {productQty.product.images
              ? productQty.product.images[0].color
              : 'undified'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {formatPrice(productQty.product.price)}
      </div>
      <div className="flex items-center justify-center ">
        {productQty.quantity}
      </div>
      <div className="flex items-center justify-end">
        {formatPrice(productQty.product.price * productQty.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
