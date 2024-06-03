import { Cart } from '@/lib/type/cart';
import {
  Cartitem,
  ListOrderRequest,
  Order,
  ResListOrders
} from '@/lib/type/order';
import { Product, ResListData, updateProduct } from '@/lib/type/product';
import { User } from '@/lib/type/user';

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
  let strignReqBody = '';

  if (params) {
    queryString = buildQueryString(params);
  }
  if (reqBody) {
    if (queryString !== '') {
      queryString = buildQueryString(reqBody);
    } else {
      queryString = queryString + buildQueryString(reqBody);
    }
  }

  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/product/list${queryString ? `?${queryString}` : ''}`,
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
    `https://backend.tungdev1996.online/api/v1/product/getProduct/${name}`,
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

export const getOrders = async (
  token: string,
  reqBody?: ListOrderRequest,
  params?: Paging
) => {
  let queryString = '';

  if (params) {
    queryString = buildQueryString(params);
  }

  console.log(queryString);

  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/order/Private/list${queryString ? `${queryString}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reqBody)
    }
  );
  if (response.status === 200) {
    const data = (await response.json()) as ResListOrders;
    return data;
  } else {
    return response.status;
  }
};

//create an order
export const CreateNewOrder = async (token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/order/Private/createOrder`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (response.status === 200) {
    const data = (await response.json()).data as string;
    return data;
  }

  return null;
};

export const updateOrderAPI = async (
  orderid: string,
  token: string,
  order: Order
) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/order/Private/updateOrder/${orderid}`, // Append id to the URL
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(order)
    }
  );
  if (response.status === 200) {
    return 200;
  } else {
    return response.status;
  }
};

export const softDeleteOrder = async (orderid: string, token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/order/Private/softDeleteOrder/${orderid}`, // Append id to the URL
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (response.status === 200) {
    return 200;
  } else {
    return response.status;
  }
};
export const updateCartItem = async (product: Cartitem, token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/cart/Private/updateCart`, // Append id to the URL
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    }
  );
  return response.status;
};

export const getCart = async (token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/cart/Private/getCart`, // Append id to the URL
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (response.status === 200) {
    const data = (await response.json()).data as Cart;
    return data;
  } else {
    return null;
  }
};

export const getOrder = async (id: string, token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/order/Private/getOrder/${id}`, // Append id to the URL
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

export const updateCart = async (products: Cartitem, token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/cart/Private/updateCart`, // Append id to the URL
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(products)
    }
  );

  return response.status;
};

export const addProductToCart = async (products: Cartitem, token: string) => {
  const response = await fetch(
    `https://backend.tungdev1996.online/api/v1/cart/Private/updateCart`, // Append id to the URL
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(products)
    }
  );

  return response.status;
};

export const registerAPI = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(
      `https://backend.tungdev1996.online/api/v1/user/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      }
    );

    console.log('Json:', JSON.stringify({ name, email, password }));

    if (response.status === 200) {
      const data = (await response.json()).data as User;
      return { data, error: null };
    } else {
      const errorMessage = (await response.json()).message;
      return { data: null, error: errorMessage };
    }
  } catch (error) {
    return {
      data: null,
      error: 'An error occurred while processing your request.'
    };
  }
};

export const UpdateProductAPI = async (data: updateProduct, token: string) => {
  try {
    const response = await fetch(
      `https://backend.tungdev1996.online/api/v1/product/Private/updateProduct`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );
    if (response.status === 200) {
      return '200';
    }
  } catch (error) {
    return error;
  }
};

export const UpdateUserInfor = async (data: any, token: string) => {
  try {
    const response = await fetch(
      `https://backend.tungdev1996.online/api/v1/user/Private/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );
    if (response.status === 200) {
      return 200;
    } else {
      return response.status;
    }
  } catch (error) {
    return error;
  }
};
