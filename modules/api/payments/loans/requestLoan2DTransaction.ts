import maxAxios from '~/api/axios';
import { PaymentTransactionRequest } from '~/types/Requests';
import { PaymentError } from '~/utils/errors';

type Body = PaymentTransactionRequest;
type Resp = 'A' | 'D';

const requestLoan2DTransaction = async (data: Body): Promise<boolean> => {
  const response = await maxAxios.post<Resp>('/procesar2dsecure/prestamopersonal', data, {
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
