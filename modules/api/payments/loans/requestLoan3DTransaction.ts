import Axios from 'axios';
import maxAxios from '~/api/axios';
import { LoanPaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

const requestLoan3DTransaction = async (Data: LoanPaymentRequest): Promise<MaxilanaTransaction> => {
  const { cardtype, ...params } = Data;

  // const axTest = Axios.create({ baseURL: 'http://127.0.0.1:3050' });
  // const response = await axTest.post('/api/pagos/3dsecure/web/pp/v1', params);

  const response: any = await maxAxios.post<MaxilanaTransaction>(
    '/pagos/3dsecure/web/pp/v1',
    params,
  );

  if (!response.Resultado.id) {
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }

  return response;
};

export default requestLoan3DTransaction;
