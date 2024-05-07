import { CartProduct } from '../types/CartProduct';

export function getId(list: CartProduct[]) {
  const ids = list.map((item) => item.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
}
