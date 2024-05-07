'use client';

import { getAddress } from '@/api/fetch';
import { Address } from '@/lib/type/order';
import { useEffect, useState } from 'react';
import AddressForm from './addressform';

interface OrderProps {
  orderID: string;
}

const SelectAddress = ({ orderID }: OrderProps) => {
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);
  const [addNewadd, setAddNewadd] = useState(false);

  useEffect(() => {
    const fetchingAddresses = async () => {
      try {
        const resAddresses = await getAddress(); // Pass orderID to getAddress
        if (resAddresses) {
          setAddresses(resAddresses);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchingAddresses();
  }, [orderID]);

  return (
    //   <>
    //     {addresses ? (
    //       <select
    //         value={addressSelected?.real_id}
    //         onChange={() => {
    //           setAddressSelected(addressSelected);
    //         }}
    //       >
    //         {addresses.map((address) => (
    //           <option key={address.real_id} value={address.real_id}>
    //             {address.street}, {address.city}, {address.state}
    //             {/* Assuming these are address fields */}
    //           </option>
    //         ))}
    //       </select>
    //     ) : (
    //       <div>Add Address</div>
    //     )}
    //   </>
    <AddressForm orderID={orderID} />
  );
};

export default SelectAddress;
