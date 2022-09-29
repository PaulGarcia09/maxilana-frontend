import Axios from 'axios';
import maxAxios from '~/api/axios';
import { PawnPaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

const requestPawn3DTransaction = async (data: PawnPaymentRequest): Promise<MaxilanaTransaction> => {
  // @ts-ignore
  const { importe, cardtype, concepto, correoelectronico, ...params } = data;

  try {
    const parametros = {
      nombre: params.nombre,
      apellido: params.apellido,
      email: params.email,
      tarjeta: params.tarjeta,
      vencimiento: params.vencimiento,
      ccv: params.ccv,
      tipotarjeta: params.tipotarjeta,
      calle: params.calle,
      pais: params.pais,
      estado: params.estado,
      ciudad: params.ciudad,
      cp: params.cp,
      celular: params.celular,
      detallepago: JSON.stringify(params.detallepago),
    };
    //const respTest = Axios.create({baseURL:'http://127.0.0.1:3050'});
    //const response = await respTest.post('/api/pagos/3dsecure/web/boleta/v1', parametros);
    const response: any = await maxAxios.post<MaxilanaTransaction>(
      '/pagos/3dsecure/web/boleta/v1',
      parametros,
    );
    const { Resultado, ...rest } = response;

    if (!Resultado.id) {
      throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
  }
};

export default requestPawn3DTransaction;
