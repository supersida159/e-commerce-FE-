'use client';

import { getProducts, UpdateProductAPI } from '@/app/actions/getProducts';
import Pagination from '@/app/components/pagination/pagination';
import { ResListData, updateProduct } from '@/lib/type/product';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// interface ManageProductsClientProps {
//   products22: Product[] | undefined;
// }

const ManageProductsClient = () => {
  let rows: any[] = [];
  const router = useRouter();

  const [Resproducts, setResProducts] = useState<ResListData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default value

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(); // Assuming getProducts is defined
        setResProducts(res);
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

    //Update Producgt
    const data: updateProduct = {
      id: editableItemId,
      // Retrieve values from the input fields for the updated product

      active: (
        document.getElementById(
          `active-checkbox-${editableItemId}`
        ) as HTMLInputElement
      ).checked,
      brand: (
        document.getElementById(
          `brand-input-${editableItemId}`
        ) as HTMLInputElement
      ).value,
      quantity: parseInt(
        (
          document.getElementById(
            `quantity-input-${editableItemId}`
          ) as HTMLInputElement
        ).value
      ),
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
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Code</th>
            <th className="border border-gray-400 p-2">Active</th>
            <th className="border border-gray-400 p-2">Brand</th>
            <th className="border border-gray-400 p-2">Quantity</th>
            <th className="border border-gray-400 p-2">Price</th>
            <th className="border border-gray-400 p-2">Category</th>
            <th className="border border-gray-400 p-2">Color</th>
            <th className="border border-gray-400 p-2">Edit</th>
          </tr>
        </thead>
        <tbody className="">
          {Resproducts?.data?.map((item, index) =>
            // Check if the index falls within the current page range
            index >= (currentPage - 1) * itemsPerPage &&
            index < currentPage * itemsPerPage ? (
              // Render the item if it falls within the current page range
              <tr key={item.id}>
                <td className="border border-gray-400 p-2">{item.id}</td>
                <td className="border border-gray-400 p-2">{item.name}</td>
                <td className="border border-gray-400 p-2">
                  <div>{item.code}</div>
                </td>

                <td className="border border-gray-400 p-2">
                  <div>
                    {editableItemId === item.id ? (
                      <input
                        type="checkbox"
                        defaultChecked={item.active}
                        id={`active-checkbox-${item.id}`}
                      />
                    ) : item.active ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 p-2">
                  <div>
                    {editableItemId === item.id ? (
                      <input
                        type="text"
                        defaultValue={item.brand}
                        id={`brand-input-${item.id}`}
                      />
                    ) : (
                      item.brand
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="number"
                      defaultValue={item.quantity}
                      id={`quantity-input-${item.id}`}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="border border-gray-400 p-2">
                  <div>
                    {editableItemId === item.id ? (
                      <input
                        type="number"
                        defaultValue={item.price}
                        id={`price-input-${item.id}`}
                      />
                    ) : (
                      item.price
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 p-2">
                  {editableItemId === item.id ? (
                    <input
                      type="text"
                      defaultValue={item.category}
                      id={`category-input-${item.id}`}
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td className="border border-gray-400 p-2">
                  <div
                    className={`h-full w-full `}
                    style={{
                      background: `${item.images.colorCode}`
                    }}
                  >
                    {item.images.color}
                  </div>
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
          totalItems={Resproducts?.data?.length ?? 0}
          currentPage={currentPage}
          handlesetCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          handleSetItensPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
