import Axios from 'axios';
import maxAxios from '~/api/axios';
import { CouponPaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

const request3DCouponTransaction = async (
  Data: CouponPaymentRequest,
): Promise<MaxilanaTransaction> => {
  // const axiosTest = Axios.create({ baseURL: 'http://127.0.0.1:3050'});
  // const response = await axiosTest.post('/api/pagos/3dsecure/web/vales/v1', Data);
  const response = await maxAxios.post<MaxilanaTransaction>('/pagos/3dsecure/web/vales/v1', Data);

  if (!response.Resultado.id) {
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }

  return response;
};

export default request3DCouponTransaction;
