'use client';

import { geOrders } from '@/app/actions/getProducts';
import { ResListOrders } from '@/lib/type/order';
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// interface ManageOrdersClientProps {
//   Orders22: Order[] | undefined;
// }

const ManageOrdersClient = () => {
  let rows: any[] = [];
  const router = useRouter();
  const [ResOrders, setResOrders] = useState<ResListOrders | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await geOrders(); // Assuming getOrders is defined
        setResOrders(res);
        setLoading(false);
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (ResOrders?.data) {
    rows = ResOrders.data.map((order) => ({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      // Assuming you have nested properties for products, shipping, and address
      ProductQuantity: order.ProductQuantity.map((eachproduct) => ({
        id: eachproduct.product.id,
        name: eachproduct.product.name // Assuming product has a name property
        // Include other properties of the product as needed
      })),
      shipping: order.shipping, // Assuming shipping contains all necessary details
      orderTotal: order.orderTotal,
      notes: order.notes,
      address: `${order.address.street}, ${order.address.city}, ${order.address.state}`, // Concatenate address properties into a single string
      orderCancelled: `${order.orderCancelled ? 'orderCancelled' : 'Order'} `
      // Include other properties of the order as needed
    }));
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      renderCell: (params) => (
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/admin/Manage-Orders/${params.value}`)}
        >
          {params.value}
        </div>
      )
    },
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'customerPhone', headerName: 'Customer Phone', width: 150 },
    // Add columns for products, shipping, orderTotal, notes, address, orderCancelled, etc.
    // Example:
    { field: 'ProductQuantity', headerName: 'Product Quantity', width: 150 }, // Adjust as needed

    { field: 'shipping.method', headerName: 'Shipping Method', width: 150 },
    { field: 'orderTotal', headerName: 'Order Total', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'orderCancelled', headerName: 'Cancelled', width: 100 }
  ];

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Products Oder</h2>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
              <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."></input>
                </div>
              <div className="lg:ml-40 ml-10 space-x-8">
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button>
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        products
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created at
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        QRT
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                      alt="" />
                                              </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Vera Carpenter
                              </p>
                            </div>
                          </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 21, 2020
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          43
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                              <span aria-hidden
                                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">Activo</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                      alt="" />
                                              </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Blake Bowman
                              </p>
                            </div>
                          </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 01, 2020
                        </p>
                        </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          77
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                              <span aria-hidden
                                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">Activo</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                                      src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                      alt="" />
                                              </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Dana Moore
                              </p>
                            </div>
                          </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 10, 2020
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          64
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                                              className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                              <span aria-hidden
                                                  className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                        <span className="relative">Suspended</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                                      src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                                      alt="" />
                                              </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Alonzo Cox
                              </p>
                            </div>
                          </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Jan 18, 2020</p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">70</p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                              <span aria-hidden
                                                  className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative">Inactive</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900">
                                  Showing 1 to 4 of 50 Entries
                              </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                      Prev
                                  </button>
                    &nbsp; &nbsp;
                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                      Next
                                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ManageOrdersClient;
