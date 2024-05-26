'use client';

import { getOrders, updateOrderAPI } from '@/app/actions/getProducts';
import Heading from '@/app/components/Heading/heading';
import ActionButton from '@/app/components/products/ActionButton';
import { Order, ResListOrders } from '@/lib/type/order';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdRemoveRedEye } from 'react-icons/md';
import formatPrice from '../../../utils/formatPrice';

// interface ManageOrdersClientProps {
//   orders: Order[] | undefined;
// }

const OrdersClient = () => {
  let rows: any[] = [];
  const [ResOrders, setResOrders] = useState<ResListOrders | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [daysPassed, setDaysPassed] = useState(null);

  if (ResOrders?.data) {
    rows = ResOrders?.data.map((order) => {
      const estimatedDelivery = order.shipping?.EstimatedDelivery;
      const shippingDate = estimatedDelivery
        ? new Date(estimatedDelivery)
        : null;
      const targetDate = new Date(order?.created_at || 0);

      // Get the current date
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const difference = currentDate.getTime() - targetDate.getTime();

      return {
        id: order.id,
        status: order.status,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        created_at: difference,
        orderTotal: formatPrice(order.orderTotal || 0),
        ProductQuantity: order.ProductQuantity,
        notes: order.notes,
        shipping: shippingDate
        // address: order.address
      };
    });
  }
  const statusOptions = [{ value: 1, label: 'Order Cancelled' }];
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'customer_name',
      headerName: 'Customer Name',
      type: 'string',
      width: 100
    },
    {
      field: 'customer_phone',
      headerName: 'Customer Phone',
      type: 'number',
      width: 100
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 150
    },
    {
      field: 'orderTotal',
      headerName: 'Order Total(USD)',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="text-center font-bold text-slate-800 ">
            {params.value}
          </div>
        );
      }
    },
    {
      field: 'notes',
      headerName: 'Note',
      width: 200
    },
    {
      field: 'shipping',
      type: 'dateTime',
      headerName: 'Estimated Delivery',
      width: 150,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      type: 'singleSelect',
      renderCell: (params) => (
        <div className=" text-center font-bold text-slate-800 ">
          {(() => {
            switch (params.row.status) {
              case 1:
                return (
                  <div className="rounded-lg bg-red-500 p-2">
                    Order Cancelled
                  </div>
                );
              case 2:
                return (
                  <div
                    className="cursor-pointer rounded-lg bg-yellow-300 p-2"
                    onClick={() => router.push(`/orders/${params.row.id}`)}
                  >
                    Cick to Pay
                  </div>
                );
              case 3:
                return (
                  <div className="rounded-lg bg-blue-500 p-2 p-2">
                    Waiting for Shipment
                  </div>
                );
              case 43:
                return (
                  <div className="rounded-lg bg-green-300 p-2">Shipped</div>
                );
              case 5:
                return (
                  <div className="rounded-lg bg-green-800 p-2">Delivered</div>
                );
            }
          })()}
        </div>
      ),

      editable: true,
      valueOptions: statusOptions
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 60,

      renderCell: (params) => (
        <div className="flex w-full items-center justify-center gap-4">
          <ActionButton
            Icon={MdRemoveRedEye}
            onClick={() => router.push(`/orders/orderDetails/${params.row.id}`)}
          />
        </div>
      )
    }
  ];
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getCookie('token');
        if (typeof token !== 'undefined') {
          // Check if token is defined before using it
          const res = await getOrders(token);
          if (res === 401) {
            toast.dismiss('Your login has expired. Please login again.');
            router.push('/login');
          } else if (typeof res === 'number') {
            toast.dismiss('Something went wrong. Please try again later.');
          } else {
            setResOrders(res);
          }
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

  const handleProcessRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    console.log('newRow', newRow);
    console.log('oldRow', oldRow);
    try {
      const token = getCookie('token');
      if (typeof token !== 'undefined') {
        const orderUpdate: Order = {
          status: newRow.status,
          id: newRow.id
        };
        const res = await updateOrderAPI(newRow.id, token, orderUpdate); // Assuming updateOrderStatus is defined
        if (res !== 200) {
          throw new Error('Failed to update order status');
        }
        toast.success('Order status updated successfully');
      } else {
        throw new Error('Token is undefined');
      }
      return newRow;
    } catch (error) {
      setError(String(error));
      toast.error('Failed to update order status');
      return oldRow; // Return old row if update fails
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] text-xl">
      {/* Header */}
      <div className="mb-4 mt-8">
        <Heading titlle="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          className="lg:text-md md:text-sm"
          processRowUpdate={handleProcessRowUpdate}
          // disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
