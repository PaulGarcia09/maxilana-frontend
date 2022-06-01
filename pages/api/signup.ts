import maxAxios from '~/modules/api/axios';
import withSession from '~/modules/lib/withSession';
import { User } from '~/types/Models';
import { SignupRequest } from '~/types/Requests';

type MaxilanaSignupResponse = {
  Usuario: string;
};

export default withSession(async (req, res) => {
  const params: SignupRequest = req.body;

  try {
    const response = await maxAxios.post<MaxilanaSignupResponse>('/usuarios/registro', params);

    if (!response) {
      throw new Error('No recibimos respuesta del servidor. Intenta de nuevo más tarde.');
    }

    if (!response.Usuario) {
      throw new Error(
        'El registro no se completó con éxito. No recibimos una respuesta satisfactoria del servidor.',
      );
    }

    const authUser: User = {
      isLoggedIn: true,
      name: params.Nombre,
      lastname: params.Apellidop,
      surname: params.Apellidom,
      userCode: response.Usuario,
      cellphone: params?.Celular ?? '',
      email: params?.Correo ?? '',
    };

    req.session.set('user', authUser);
    await req.session.save();

    res.json(authUser);
  } catch (err) {
    res
      .status(422)
      // @ts-ignore
      .json({ errors: [{ message: `Ocurrió un error en el registro. ${error?.message}` }] });
  }
});
