import maxAxios from '~/api/axios';
import { CartPurchase } from '~/types/Requests';
import { DeliveryData, PaymentRequest } from '~/components/checkout/Types/CheckOutTypes';
import { MaxilanaCheckout3DResponse } from '~/types/Responses';
import Axios from 'axios';

const request3DTransaction = async (
  data: CartPurchase,
  deliveryData: DeliveryData,
): Promise<MaxilanaCheckout3DResponse> => {
  try {
    const paymentRequest = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      tarjeta: data.tarjeta,
      vencimiento: data.vencimiento,
      ccv: data.ccv,
      tipotarjeta: data.tipotarjeta,
      calle: data.calle,
      pais: data.pais,
      estado: data.estado,
      ciudad: data.ciudad,
      cp: data.cp,
      celular: data.celular,
      nombreenvio: deliveryData.nombreenvio,
      celularenvio: deliveryData.celularenvio,
      domicilioenvio: deliveryData.domicilioenvio,
      codigopostalenvio: deliveryData.codigopostalenvio,
      coloniaenvio: deliveryData.coloniaenvio,
      municipioenvio: deliveryData.municipioenvio,
      estadoenvio: deliveryData.estadoenvio,
      instruccionesenvio: deliveryData.instruccionesenvio,
      orden: data.orden,
    };

    // const axTest = Axios.create({ baseURL: 'http://127.0.0.1:3050' });
    // const response = await axTest.post(
    //   '/api/pagos/3dsecure/web/productos/v1', paymentRequest
    // )
    const response: any = await maxAxios.post<MaxilanaCheckout3DResponse>(
      '/pagos/3dsecure/web/productos/v1',
      paymentRequest,
    );

    if (!response.Resultado.id) {
      throw new Error('Ocurrió un error al procesar el pago, inténtalo en otra ocasión.');
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default request3DTransaction;
