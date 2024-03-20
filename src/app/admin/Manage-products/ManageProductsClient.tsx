'use client';

import { getProducts } from '@/app/actions/getProducts';
import { ResListData } from '@/lib/type/product';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// interface ManageProductsClientProps {
//   products22: Product[] | undefined;
// }

const ManageProductsClient = () => {
  let rows: any[] = [];
  const [Resproducts, setResProducts] = useState<ResListData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  if (Resproducts?.data) {
    rows = Resproducts.data.map((product) => ({
      id: product.id,
      name: product.name,
      code: product.code,
      brand: product.brand,
      active: product.active,
      price: product.price
    }));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 120 },
    { field: 'active', headerName: 'Active', width: 100 },
    { field: 'price', headerName: 'Price', width: 120 }
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ManageProductsClient;
