import maxAxios from '~/api/axios';
import { Pawn2DRequest } from '~/types/Requests';
import { PaymentError } from '~/utils/errors';

type Pawn2DSecureResponse = {
  resultado: boolean;
};

const requestPawn2DTransaction = async (data: Pawn2DRequest): Promise<boolean> => {
  const response = await maxAxios.post<Pawn2DSecureResponse>(
    '/procesar2dsecure/web/boletas',
    data,
    {
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
};

export default requestPawn2DTransaction;
