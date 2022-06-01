import maxAxios from '~/api/axios';
import { CartPurchase } from '~/types/Requests';
import { MaxilanaCheckout3DResponse } from '~/types/Responses';

const request3DTransaction = async (data: CartPurchase): Promise<MaxilanaCheckout3DResponse> => {
  const response = await maxAxios.post<MaxilanaCheckout3DResponse>(
    '/procesar3dsecure/web/productos',
    data,
  );

  if (!response.id) {
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }

  return response;
};

export default request3DTransaction;
