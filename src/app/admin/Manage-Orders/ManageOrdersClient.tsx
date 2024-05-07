'use client';

import { getOrders, UpdateProductAPI } from '@/app/actions/getProducts';
import Pagination from '@/app/components/pagination/pagination';
import { Order, ResListOrders } from '@/lib/type/order';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// interface ManageProductsClientProps {
//   products22: Product[] | undefined;
// }

const ManageOrdersClient = () => {
  let rows: any[] = [];
  const router = useRouter();

  const [ResOrders, setResOrders] = useState<ResListOrders | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default value

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getCookie('token');
        if (typeof token !== 'undefined') {
          // Check if token is defined before using it
          const res = await getOrders(token);
          setResOrders(res);
          setLoading(false);
        } else {
          throw new Error('Token is undefined'); // Throw an error if token is undefined
        }
        setLoading(false);
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [editableItemId, setEditableItemId] = useState('');

  const handleEditClick = (id: string) => {
    setEditableItemId(id);
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Editable item ID:', editableItemId);
    console.log(
      'active box:',
      (
        document.getElementById(
          `active-checkbox-${editableItemId}`
        ) as HTMLInputElement
      ).checked
    );
    const orderCancelledValue = parseInt(
      (
        document.getElementById(
          `order-input-${editableItemId}`
        ) as HTMLInputElement
      ).value
    );

    const orderCancelled = orderCancelledValue ? true : false;

    //Update Producgt
    const data: Order = {
      id: editableItemId,
      // Retrieve values from the input fields for the updated product

      order_cancelled: orderCancelled,
      price: (
        document.getElementById(
          `price-input-${editableItemId}`
        ) as HTMLInputElement
      ).value,
      category: (
        document.getElementById(
          `category-input-${editableItemId}`
        ) as HTMLInputElement
      ).value
    };
    const updateproduct = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/login');
        } else {
          const res = await UpdateProductAPI(data, token); // Assuming getProducts is defined
          setLoading(false);
          if (res === '200') {
            toast.success('Update success!');
          } else {
            toast.error('Update failed!');
          }
        }
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }
    };
    updateproduct();
    setEditableItemId('');
  };

  const handleCancel = () => {
    // Implement your cancel logic here
    setEditableItemId('');
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="h-full w-full">
      <table className="w-full table-auto border-collapse border-2 border-gray-400">
        <thead>
          <tr className="">
            <th className="border border-gray-400 p-2">ID</th>
            <th className="border border-gray-400 p-2">Customer Name</th>
            <th className="border border-gray-400 p-2">OrderCancelled</th>
            <th className="border border-gray-400 p-2">Shipping Method</th>
            <th className="border border-gray-400 p-2">Shipping Cost</th>
            <th className="border border-gray-400 p-2">
              Estimated Delivery Date
            </th>
            <th className="border border-gray-400 p-2">Total Cost</th>
            <th className="border border-gray-400 p-2">Note</th>
            <th className="border border-gray-400 p-2">Edit</th>
          </tr>
        </thead>
        <tbody className="">
          {ResOrders?.data?.map((item, index) =>
            // Check if the index falls within the current page range
            index >= (currentPage - 1) * itemsPerPage &&
            index < currentPage * itemsPerPage ? (
              // Render the item if it falls within the current page range
              <tr key={item.id}>
                <td className="border border-gray-400 p-2">{item.id}</td>
                <td className="border border-gray-400 p-2">
                  {item.customer_name}
                </td>

                <td className="border border-gray-400 p-2">
                  <div>
                    {editableItemId === item.id ? (
                      <input
                        type="checkbox"
                        defaultChecked={item.order_cancelled}
                        id={`order-checkbox-${item.id}`}
                      />
                    ) : item.order_cancelled ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </div>
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="text"
                      defaultValue={item.shipping?.Method}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.shipping?.Method
                  )}
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="number"
                      defaultValue={item.shipping?.Cost}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.shipping?.Cost
                  )}
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="date"
                      defaultValue={item.shipping?.EstimatedDelivery}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.shipping?.EstimatedDelivery
                  )}
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="number"
                      defaultValue={item.orderTotal}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.orderTotal
                  )}
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="text"
                      defaultValue={item.notes}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.notes
                  )}
                </td>

                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleSave}
                        className=" rounded-md border-2 border-gray-400 bg-slate-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className=" rounded-md border-2 border-gray-400 bg-slate-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleEditClick(item.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ) : // If the index is outside the current page range, render nothing
            null
          )}
        </tbody>
      </table>

      <div className="absolute bottom-0 left-0 right-0 w-full items-center justify-center">
        <Pagination
          totalItems={ResOrders?.data?.length ?? 0}
          currentPage={currentPage}
          handlesetCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          handleSetItensPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
