import { Address } from '@/lib/type/order';

type AddressFormProps = {
  address: Address | null;
  isDefault: boolean;
  onClick?: () => void;
};

const AddressForm = ({ address, isDefault, onClick }: AddressFormProps) => {
  return (
    <div
      className="my-3 flex w-full max-w-[800px] flex-col items-start justify-center space-y-2 rounded-2xl border-2 border-black bg-slate-300 p-2"
      onClick={onClick}
    >
      <p>{address?.city}</p>
      <div className="flex w-full flex-row justify-between">
        <p>{address?.state}</p>
        {isDefault ? <p>Default Address</p> : null}
      </div>
      <p>{address?.street}</p>
    </div>
  );
};

export default AddressForm;
