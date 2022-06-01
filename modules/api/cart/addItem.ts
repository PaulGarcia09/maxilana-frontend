import maxAxios from '../axios';
import { Cart } from '~/types/Models/Cart';
import { MaxilanCartResponse } from '~/types/Responses';
import { normalizeCart } from '../normalizers';

type CartRequest = {
  codigo: string;
  orden: string;
};

export default async function addItem(data: CartRequest): Promise<Cart> {
  const response = await maxAxios.post<MaxilanCartResponse>('/carrito/agregararticulo', data);

  if (!response.orden) {
    throw new Error(
      'Ocurrió un error al agregar el producto al carrito, inténtalo en otra ocasión',
    );
  }

  return normalizeCart(response);
}
