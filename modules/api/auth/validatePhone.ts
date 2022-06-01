import maxAxios from '../axios';
import parseQuery from '~/utils/parseQuery';

type Body = {
  celular: string;
};

type Resp = {
  Usuario?: string;
  Codigo?: string;
  mensaje?: string;
};

export default async function validatePhone(data: Body) {
  const params = parseQuery(data);
  const response = await maxAxios.get<Resp>(`/usuarios/obtenercodigoregistro?${params}`);
  console.log(response);
  if (!response?.Usuario) {
    const error =
      response?.mensaje ??
      'No fue posible obtener el código de validación, pruébalo en otra ocasión';
    throw new Error(error);
  }
}
