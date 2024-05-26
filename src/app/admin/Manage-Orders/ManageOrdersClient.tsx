'use client';

import { getOrders, updateOrderAPI } from '@/app/actions/getProducts';
import Heading from '@/app/components/Heading/heading';
import ActionButton from '@/app/components/products/ActionButton';
import { Order, ResListOrders } from '@/lib/type/order';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdRemoveRedEye } from 'react-icons/md';
import formatPrice from '../../../../utils/formatPrice';

// interface ManageOrdersClientProps {
//   orders: Order[] | undefined;
// }

const ManageOrdersClient = () => {
  let rows: any[] = [];
  const [ResOrders, setResOrders] = useState<ResListOrders | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default value

  if (ResOrders?.data) {
    rows = ResOrders?.data.map((order) => {
      const estimatedDelivery = order.shipping?.EstimatedDelivery;
      const shippingDate = estimatedDelivery
        ? new Date(estimatedDelivery)
        : null;

      return {
        id: order.id,
        status: order.status,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        created_at: order.created_at,
        orderTotal: formatPrice(order.orderTotal || 0),
        ProductQuantity: order.ProductQuantity,
        notes: order.notes,
        shipping: shippingDate
        // address: order.address
      };
    });
  }
  const statusOptions = [
    { value: 1, label: 'Order Cancelled' },
    { value: 2, label: 'Waiting For Payment' },
    { value: 3, label: 'Waiting for Shipment' },
    { value: 4, label: 'Shipped' },
    { value: 5, label: 'Delivered' }
  ];
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200
    },
    {
      field: 'customer_name',
      headerName: 'Customer Name',
      type: 'string',
      editable: true
    },
    {
      field: 'customer_phone',
      headerName: 'Customer Phone',
      type: 'number',
      editable: true,
      resizable: true
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200
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
      width: 200,
      editable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      type: 'singleSelect',
      renderCell: (params) => (
        <div className="text-center font-bold text-slate-800 ">
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
                  <div className="rounded-lg bg-yellow-300 p-2">
                    Waiting For Payment
                  </div>
                );
              case 3:
                return (
                  <div className="rounded-lg bg-blue-500 p-2 p-2">
                    Waiting for Shipment
                  </div>
                );
              case 4:
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
      renderCell: (params) => (
        <div className="flex w-full items-center justify-center gap-4">
          <ActionButton
            Icon={MdRemoveRedEye}
            onClick={() => router.push(`/admin/Manage-Orders/${params.row.id}`)}
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

  interface editRow {
    id: string;
    status: number;
    customer_name: string;
    customer_phone: number;
    shipping: Date;
    note: string;
  }

  const handleEditRow = async (newrow: editRow) => {
    console.log('Row:', newrow.shipping);
    // Update order

    const orderupdate: Order = {
      id: newrow.id,
      status: newrow.status,
      customer_name: newrow.customer_name,
      customer_phone: newrow.customer_phone,
      shipping: {
        EstimatedDelivery: new Date() // Parsing the date correctly
      }
    }; // Closing brace for orderupdate object

    const updateOrder = async (order: Order) => {
      // Function definition moved outside handleEditRow
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/login');
        } else {
          const res = await updateOrderAPI(order.id, token, order); // Assuming updateOrderAPI is defined
          setLoading(false);
          if (res === 200) {
            toast.success('Update success!');
          } else {
            toast.error('Update failed!');
          }
        }
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }
    }; // Closing brace for updateOrder function

    await updateOrder(orderupdate); // Calling updateOrder with orderupdate parameter
    return newrow;
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
          editMode="row"
          // onRowEditStop={(params) => handleEditRow(params)}
          // onRowEditCommit={(paramid) => handleEditRow(paramid)}
          processRowUpdate={(newRow, oldRow) => {
            handleEditRow(newRow);
            return newRow;
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error);
          }}
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
