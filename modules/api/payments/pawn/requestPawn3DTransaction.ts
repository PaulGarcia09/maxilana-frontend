import Axios from 'axios';
import maxAxios from '~/api/axios';
import { PawnPaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

const requestPawn3DTransaction = async (data: PawnPaymentRequest): Promise<MaxilanaTransaction> => {
  // @ts-ignore
  const { importe, cardtype, concepto, correoelectronico, ...params } = data;

  const response = await maxAxios.post<MaxilanaTransaction>(
    '/procesar3dsecure/web/boletas',
    params,
  );

  if (!response.id) {
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }

  return response;
};

export default requestPawn3DTransaction;
