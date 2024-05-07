import { Paging } from '@/app/actions/getProducts';
import { Product } from './product';

export interface Order {
  id: string;
  created_at?: Date;
  userOrderID?: number;
  customer_name?: string;
  customer_phone?: string;
  ProductQuantity?: Cartitem[];
  shipping?: ShippingInfo;
  orderTotal?: number;
  notes?: string;
  address?: Address;
  order_cancelled?: boolean;
}
export interface Cartitem {
  id?: number;
  cart_id?: number;
  product_id?: number;
  product: Product;
  quantity: number;
}
export interface ShippingInfo {
  Method: string;
  Cost: number;
  EstimatedDelivery: string; // Adjust the type to match the format of time.Time in your application
  // Add any additional shipping details as needed
}

// Define the Address interface
export interface Address {
  real_id?: number;
  status?: number;
  street: string;
  city: string;
  state: string;
}

export interface UpdateOrderRequest {
  id: number; // Assuming you need to include the ID for updating the order
  customer_name: string;
  customer_phone: string;
  notes: string;
  orderCancelled: boolean;
  address: Address;
}

// Define the PlaceOrderRequest interface
export interface PlaceOrderRequest {
  customer_name?: string;
  customer_phone?: string;
  products: Cartitem[] | null;
  notes?: string;
  address?: Address;
}

export interface ListOrderRequest {
  // Include properties from common.SQLModel struct
  id?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;

  orderCancelled?: boolean;
  customerName?: string;
  customerPhone?: string;
}

export interface ResListOrders {
  data: Order[];
  paging: Paging;
  filter: ListOrderRequest;
}

export interface ResPlaceOrder {
  OrderID: string;
  ExTime: string;
}
