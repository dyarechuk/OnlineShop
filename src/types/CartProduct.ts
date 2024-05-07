import { Product } from './Product';

export interface CartProduct {
  product: Product;
  id: number;
  cartQuantity: number;
}
