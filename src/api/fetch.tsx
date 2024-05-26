import { Address } from '@/lib/type/order';
import { ReqCreateProduct } from '@/lib/type/product';
import { ResUploadImageData } from '@/lib/type/user';
import { deleteCookie, getCookie } from 'cookies-next';

const Domain = 'http://167.172.75.249/api/v1';
export const fetchDataWithValidToken = async (
  endpoint: string,
  method: string,
  body?: any // Optional body parameter
) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    };

    const options: RequestInit = {
      method, // or 'GET' or any other HTTP method your server expects
      headers
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${Domain}/${endpoint}`, options);

    if (response.ok) {
      const data = await response.json();
      return { data, ok: true };
    } else if (response.status === 401) {
      deleteCookie('jwt', { path: '/login' });
      return { undefined, ok: false };
    } else {
      // Handle other error scenarios if needed
      deleteCookie('jwt', { path: '/login' });
      console.error('Error validating token:', response.statusText);
      return { undefined, ok: false };
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return { undefined, ok: false };
  }
};
type LoginData = {
  data: {
    access_token: {
      access_token: string;
      created: string;
      expire: number;
    };
    refresh_token: {
      access_token: string;
      created: string;
      expire: number;
    };
  };
};
export const Login = async (
  email: string,
  password: string,
  endpoint: string
): Promise<LoginData | undefined | number> => {
  try {
    const response = await fetch(`http://167.172.75.249/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      return response.status;
    }
  } catch (err) {
    console.log(err);
  }
};

// interface User {
//   data: {
//     id: number | null;
//     status: number;
//     created_at: string;
//     updated_at: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     role: string;
//     avatar: Image;
//   };
// }

// interface Image {
//   id: number;
//   url: string;
//   width: number;
//   height: number;
//   cloudName: string;
//   extension: string;
// }

export const getUserInfor = async () => {
  try {
    const response = await fetchDataWithValidToken('user/Private/infor', 'GET');

    if (response.ok) {
      return response.data;
    }
  } catch (err) {
    console.error('Error getting user information:', err);
  }
};

export const getAddress = async () => {
  try {
    const response = await fetchDataWithValidToken(
      'user/Private/address',
      'GET'
    );

    if (response.ok) {
      return response.data.data as Address[];
    }
  } catch (err) {
    console.error('Error getting user information:', err);
  }
};

export const UploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${Domain}/upload/upload/addImage`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      },
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const responseData = await response.json();

      // Assuming that your response structure has a property 'data'
      if (responseData.data !== undefined) {
        return responseData.data as ResUploadImageData;
      } else {
        console.error(
          'Response data is missing the "data" property:',
          responseData
        );
      }
    } else {
      console.error('Error uploading image:', response.statusText);
    }
  } catch (err) {
    console.error('Error uploading image:', err);
  }
};

export const AddNewProduct = async (data: ReqCreateProduct) => {
  try {
    const response = await fetch(`${Domain}/product/Private/createProduct`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();

      // Assuming that your response structure has a property 'data'
      if (responseData.data !== undefined) {
        return responseData.data;
      } else {
        console.error(
          'Response data is missing the "data" property:',
          responseData
        );
      }
    } else {
      console.error('Error uploading image:', response.statusText);
    }
  } catch (err) {
    console.error('Error uploading image:', err);
  }
};
