import { Paging, ReqListProduct } from '@/app/actions/getProducts';

export interface ReqCreateProduct {
  name: string;
  description: string;
  brand: string;
  active: boolean;
  images: image[];
  price: number;
  category: string;
}

export interface image {
  color: string;
  colorCode: string;
  image: img;
}

export interface img {
  id: number;
  url: string;
  width: number;
  height: number;
  cloud_name: string;
  extension: string;
}
export interface Product {
  id: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  code: string;
  images: image;
  active: boolean;
  brand?: string;
  quantity: number;
  price: number;
  category: string;
  description?: string;
}

export interface updateProduct {
  id: string;
  status?: number;
  name?: string;
  code?: string;
  images?: image;
  active?: boolean;
  brand?: string;
  quantity?: number;
  price?: string;
  category?: string;
  description?: string;
}

export interface ResListData {
  data: Product[];
  paging: Paging;
  filter: ReqListProduct;
}
