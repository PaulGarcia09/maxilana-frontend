import maxAxios from '~/api/axios';
import { CouponPaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

const request3DCouponTransaction = async (
  data: CouponPaymentRequest,
): Promise<MaxilanaTransaction> => {
  const response = await maxAxios.post<MaxilanaTransaction>('/procesar3dsecure/vales', data);

  if (!response.id) {
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }

  return response;
};

export default request3DCouponTransaction;
