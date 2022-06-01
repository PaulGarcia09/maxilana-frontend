import maxAxios from '~/modules/api/axios';
import withSession from '~/modules/lib/withSession';
import { User } from '~/types/Models';
import { MaxilanaLoginResponse } from '~/types/Responses';

export default withSession(async (req, res) => {
  const { user, password } = req.body;

  try {
    const response = await maxAxios.post<MaxilanaLoginResponse>('/usuarios/login', {
      user,
      password,
    });

    if (!response) {
      throw new Error('No recibimos respuesta del servidor, inténtalo más tarde.');
    } else if (response?.error) {
      throw new Error(response.error);
    }

    const authUser: User = {
      isLoggedIn: true,
      userCode: response.CodigoUsuario,
      name: response.NombreCompleto,
      lastname: response.PrimerApellido,
      surname: response.SegundoApellido,
      cellphone: '', // No viene en el login
      email: '', // No viene en el login
    };

    req.session.set('user', authUser);
    await req.session.save();

    res.json(authUser);
  } catch (error) {
    res
      .status(422)
      // @ts-ignore
      .json({ errors: [{ message: `Ocurrió un error al iniciar sesión. ${error?.message}` }] });
  }
});
