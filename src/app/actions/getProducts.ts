import {
  ListOrderRequest,
  Order,
  ProductQuantity,
  ResListOrders
} from '@/lib/type/order';
import { Product, ResListData } from '@/lib/type/product';

// ('use server');
export interface SQLModel {
  id?: string;
  status?: number;
  created_at?: string; // Assuming it's a string in ISO format
  updated_at?: string; // Assuming it's a string in ISO format
}

export interface ReqListProduct extends SQLModel {
  name?: string;
  code?: string;
  category?: string;
  brand?: string;
  active?: boolean;
  limit?: number;
  order_by?: string;
  order_desc?: boolean;
}
export interface Paging {
  page?: number;
  limit?: number;
  total?: number;
  fakeCursor?: string;
  nextCursor?: string;
}
export const buildQueryString = function (params: Paging) {
  // Convert parameters to query string
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined) // Exclude undefined values
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        // Convert boolean values to 'true' or 'false'
        return `${encodeURIComponent(key)}=${value.toString()}`;
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join('&');

  return queryString;
};

export const getProducts = async (
  reqBody?: ReqListProduct,
  params?: Paging
) => {
  let queryString = '';

  if (params) {
    queryString = buildQueryString(params);
  }

  console.log(queryString);

  const response = await fetch(
    `http://localhost:8080/api/v1/product/list${queryString ? `${queryString}` : ''}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }
  );
  if (response.status === 200) {
    const data = (await response.json()) as ResListData;
    return data;
  }

  return null;
};

export const getProduct = async (name: string) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/product/getProduct/${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  if (response.status === 200) {
    const data = (await response.json()).data as Product[];
    return data;
  }

  return null;
};

export const geOrders = async (reqBody?: ListOrderRequest, params?: Paging) => {
  let queryString = '';

  if (params) {
    queryString = buildQueryString(params);
  }

  console.log(queryString);

  const response = await fetch(
    `http://localhost:8080/api/v1/order/list${queryString ? `${queryString}` : ''}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }
  );
  if (response.status === 200) {
    const data = (await response.json()) as ResListOrders;
    return data;
  }

  return null;
};

export const getOrder = async (id: string, token: string) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/order/Private/getOrder/${id}`, // Append id to the URL
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (response.status === 200) {
    const data = (await response.json()).data as Order;
    return data;
  }

  return null;
};

export const updateCart = async (products: ProductQuantity, token: string) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/cart/Private/updateCart`, // Append id to the URL
    {
      method: 'PUTH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(products)
    }
  );
  if (response.status === 200) {
    const data = (await response.json()).data as ProductQuantity;
    return data;
  }

  return null;
};
