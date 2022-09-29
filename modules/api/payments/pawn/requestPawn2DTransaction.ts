import maxAxios from '~/api/axios';
import Axios from 'axios';
import { Pawn2DRequest } from '~/types/Requests';
import { PaymentError } from '~/utils/errors';

type Pawn2DSecureResponse = {
  resultado: boolean;
};

const requestPawn2DTransaction = async (
  data: Pawn2DRequest,
  token: any,
  cardtp: any,
): Promise<boolean> => {
  try {
    data.cardtype = cardtp;
    // const axTest = Axios.create({ baseURL: 'http://127.0.0.1:3050/api' })
    const response: any = await maxAxios.post<Pawn2DSecureResponse>(
      '/pagos/2dsecure/web/boletas',
      data,
      {
        headers: {
          authorization: token,
        },
        timeout: 10000,
        timeoutErrorMessage:
          'No fue posible obtener una respuesta del servidor. Tu pago no ha sido procesado.',
      },
    );

    if (!response?.resultado) {
      throw new PaymentError(
        'Error en 2DTransaction',
        'El servidor no regresó una respuesta satisfactoria',
        '10',
      );
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default requestPawn2DTransaction;
