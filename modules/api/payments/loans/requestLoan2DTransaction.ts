import maxAxios from '~/api/axios';
import Axios from 'axios';
import { PaymentTransactionRequest } from '~/types/Requests';
import { PaymentError } from '~/utils/errors';

type Body = PaymentTransactionRequest;
type Resp = 'A' | 'D';

const requestLoan2DTransaction = async (data: Body, token: any, cardtp: any): Promise<boolean> => {
  // const axText = Axios.create({ baseURL:'http://127.0.0.1:3050/api'});
  data.cardtype = cardtp;
  // const response = await axText.post('/pagos/2dsecure/pp', data, {
  //   headers: {
  //     'authorization': token,
  //   },
  //   timeout: 10000,
  //   timeoutErrorMessage:
  //     'No fue posible obtener una respuesta del servidor. Tu pago no ha sido procesado.',
  // });
  const response = await maxAxios.post<Resp>('/pagos/2daecure/pp', data, {
    headers: {
      authorization: token,
    },
    timeout: 10000,
    timeoutErrorMessage:
      'No fue posible obtener una respuesta del servidor. Tu pago no ha sido procesado.',
  });
  if (response === 'D') {
    throw new PaymentError(
      'Error en 2DTransaction',
      'El servidor no regresó una respuesta satisfactoria',
      '10',
    );
  }

  return true;
};

export default requestLoan2DTransaction;
