export interface User {
  id: number | null;
  status: number;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: Image;
}

export interface Image {
  id: number;
  url: string;
  width: number;
  height: number;
  cloudName: string;
  extension: string;
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
