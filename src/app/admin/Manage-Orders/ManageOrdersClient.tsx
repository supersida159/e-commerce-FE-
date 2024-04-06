'use client';

import { geOrders } from '@/app/actions/getProducts';
import { ResListOrders } from '@/lib/type/order';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};

export default ManageOrdersClient;
