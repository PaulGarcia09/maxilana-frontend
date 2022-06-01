import maxAxios from '~/modules/api/axios';
import withSession from '~/modules/lib/withSession';
import { User } from '~/types/Models';
import { SignupRequest } from '~/types/Requests';
import { MaxilanaEditResponse } from '~/types/Responses';

export default withSession(async (req, res) => {
  const request: SignupRequest = req.body;
  const user = req.session.get('user') as User;

  try {
    const params = {
      ...request,
      Usuario: user.userCode,
    };

    const response = await maxAxios.post<MaxilanaEditResponse>('/usuarios/editarperfil', params);

    if (!response) {
      throw new Error('No recibimos respuesta del servidor. Intenta de nuevo más tarde.');
    }

    if (response?.error) {
      throw new Error(response.error);
    }

    const authUser: User = {
      ...user,
      name: response.NombreCompleto,
      lastname: response.PrimerApellido,
      surname: response.SegundoApellido,
      email: response.CorreoElectronico,
      cellphone: response.Celular,
    };

    req.session.set('user', authUser);
    await req.session.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    res
      .status(422)
      // @ts-ignore
      .json({ errors: [{ message: `Ocurrió un error al editar el usuario. ${error?.message}` }] });
  }
});
