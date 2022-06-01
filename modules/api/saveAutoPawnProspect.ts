import maxAxios from './axios';
import { AutoPawnRequest } from '~/types/Requests';

type Response = {
  GrabarSolicitudDeAvaluoDeAutoResult: boolean;
};

const saveAutoPawnProspect = async (data: AutoPawnRequest): Promise<boolean> => {
  const response = await maxAxios.post<Response>('/avaluodeAuto', data, {
    timeout: 10000,
  });

  if (!response.GrabarSolicitudDeAvaluoDeAutoResult) {
    throw new Error('Ocurrió un error al guardar la solicitud, inténtalo más tarde');
  }

  return true;
};

export default saveAutoPawnProspect;
