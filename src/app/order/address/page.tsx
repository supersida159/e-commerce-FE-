import FormWrap from '@/app/components/products/FormWrap';
import DeliveryAnimation from './Animation';
import AddressForm from './addressform';

const Address = () => {
  return (
    <div className="flex h-full w-full">
      {/* Animation  */}
      <div className="  items-center justify-center sm:hidden md:block	 md:w-1/2">
        <DeliveryAnimation />
      </div>
      {/* Add Address  */}
      <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
        <FormWrap>
          <AddressForm />
        </FormWrap>
      </div>
    </div>
  );
};

export default Address;
