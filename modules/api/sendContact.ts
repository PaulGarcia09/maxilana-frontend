import maxAxios from './axios';
import { Contact } from '~/types/Requests';

type Response = {
  Respuesta: boolean;
};

const sendContact = async (data: Contact): Promise<boolean> => {
  const response = await maxAxios.post<Response>('/contacto', data, {
    timeout: 10000,
    timeoutErrorMessage:
      'El tiempo de la solicitud al servidor se ha sobrepasado, inténtalo más tarde.',
  });

  if (!response.Respuesta) {
    throw new Error('Ocurrió un error al enviar el formulario, por favor inténtalo más tarde.');
  }

  return true;
};

export default sendContact;
