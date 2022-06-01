import maxAxios from '../axios';
import { MaxilanCartResponse } from '~/types/Responses';
import { Cart } from '~/types/Models';
import { normalizeCart } from '../normalizers';

type CartRequest = {
  codigo: string;
  orden: string;
};

export default async function removeItem(data: CartRequest): Promise<Cart> {
  const response = await maxAxios.post<MaxilanCartResponse>('/carrito/eliminararticulo', data);

  if (!response.orden) {
    throw new Error(
      'Ocurrió un error al agregar el producto al carrito, inténtalo en otra ocasión',
    );
  }

  return normalizeCart(response);
}
