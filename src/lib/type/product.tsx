import { Paging, ReqListProduct } from '@/app/actions/getProducts';

export interface ReqCreateProduct {
  name: string;
  description: string;
  brand: string;
  active: boolean;
  images: ImageProduct[];
  price: number;
  category: string;
}

export interface ImageProduct {
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
  status: number;
  created_at: string;
  updated_at: string;
  name: string;
  code: string;
  images: ImageProduct[];
  active: boolean;
  brand: string;
  quantity: number;
  price: number;
}

export interface ResListData {
  data: Product[];
  paging: Paging;
  filter: ReqListProduct;
}
