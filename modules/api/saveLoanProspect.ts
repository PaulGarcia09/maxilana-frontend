import maxAxios from './axios';

type Body = {
  CodigoPlaza: number;
  MontoSolicitado: number;
  CodigoPolitica: string;
  Nombre: string;
  CorreoElectronico: string;
  Telefono: string;
  Fecha: string;
};

const saveLoanProspect = async (data: Body) => {
  const response = await maxAxios.post('/servicios/pp/postgrabarsolicitudcalculadora', data, {
    timeout: 10000,
  });

  return response;
};

export default saveLoanProspect;
