import maxAxios from '~/api/axios';
import Axios from 'axios';
import { CheckoutResponse } from '~/types/Models';
import { PaymentTransactionRequest } from '~/types/Requests';
import { MaxilanaCheckout2DResponse } from '~/types/Responses';
import { PaymentError } from '~/utils/errors';

interface Body extends PaymentTransactionRequest {
  orden: string;
}

const request2DTransaction = async (
  data: Body,
  token: any,
  cardtp: any,
  amount: any,
): Promise<CheckoutResponse> => {
  data.cardtype = cardtp;
  data.total = amount;
  // const axTest = Axios.create({ baseURL: 'http://127.0.0.1:3050/api'})
  const response: any = await maxAxios.post<MaxilanaCheckout2DResponse>(
    '/pagos/2dsecure/web/producto',
    data,
    {
      headers: {
        authorization: token,
      },
      timeout: 60000,
      timeoutErrorMessage:
        'No fue posible obtener una respuesta del servidor. Tu pago no ha sido procesado.',
    },
  );

  if (response?.resultado !== true) {
    throw new PaymentError(
      'Error en 2DTransaction',
      'El servidor no regresó una respuesta satisfactoria',
      '10',
    );
  }

  const { referencia, datosenvio } = response.data;

  return {
    reference: referencia,
    shipping: {
      name: datosenvio.nombre,
      cellphone: datosenvio.celular,
      address: datosenvio.domicilio,
      locality: datosenvio.colonia,
      zipcode: datosenvio.codigopostal,
      city: datosenvio.municipio,
      state: datosenvio.estado,
    },
  };
};

export default request2DTransaction;
