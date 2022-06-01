import { Cart } from '~/types/Models';
import { MaxilanCartResponse } from '~/types/Responses';
import maxAxios from '../axios';
import { normalizeCart } from '../normalizers';

export default async function getCart(cartToken: string): Promise<Cart> {
  const response = await maxAxios.get<MaxilanCartResponse>(`/carrito?orden=${cartToken}`);

  if (!response?.orden) {
    throw new Error('No fue posible obtener los datos del carrito');
  }

  return normalizeCart(response);
}
