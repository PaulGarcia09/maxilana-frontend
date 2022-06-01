import { Cart } from '~/types/Models';
import { MaxilanCartResponse } from '~/types/Responses';
import maxAxios from '../axios';
import { normalizeCart } from '../normalizers';

export default async function createCart(productId: string): Promise<Cart> {
  const response = await maxAxios.post<MaxilanCartResponse>('/carrito/nuevo', {
    codigo: productId,
  });

  if (!response?.orden) {
    throw new Error('Ocurrió un error al crear el carrito. Inténtalo en otra ocasión.');
  }

  return normalizeCart(response);
}
