import maxAxios from '~/api/axios';
import Axios from 'axios';
import { PaymentTransactionRequest } from '~/types/Requests';
import { PaymentError } from '~/utils/errors';

type Body = PaymentTransactionRequest;
type Resp = 'A' | 'D';

const requestCoupon2DTransaction = async (
  data: Body,
  token: any,
  cardtp: any,
): Promise<boolean> => {
  try {
    // const exTemp = Axios.create({
    //   baseURL: 'http://localhost:3050/api',
    //   headers: {
    //     'authorization': token
    //   }
    // });
    data.cardtype = cardtp;
    const response = await maxAxios.post<Resp>('/pagos/2dsecure/vales', data, {
      headers: { authorization: token },
      timeout: 60000,
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
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export default requestCoupon2DTransaction;
