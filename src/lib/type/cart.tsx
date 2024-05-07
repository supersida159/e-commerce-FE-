import { Cartitem } from './order';
import { User } from './user';

export type Cart = {
  real_id: number;
  user_id: number;
  user: User;
  items: Cartitem[];
};
