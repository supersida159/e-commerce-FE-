import { Address } from './order';

export interface User {
  real_id?: number | null;
  status?: number;
  created_at: string;
  updated_at: string;
  email: string;
  phone?: number;
  first_name: string;
  last_name: string;
  role?: string;
  avatar?: Image;
  address?: Address[];
}

export interface Image {
  id: number;
  url: string;
  width: number;
  height: number;
  cloudName: string;
  extension: string;
  address?: Address;
}
export interface ResUploadImageData {
  id: number;
  url: string;
  width: number;
  height: number;
  cloud_name: string;
  extension: string;
}

export interface Imagetype {
  color: string;
  colorCode: string;
  image: File;
}
