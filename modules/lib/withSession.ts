import { withIronSession } from 'next-iron-session';
import { NextIronHandler } from '~/types/IronSession';

export default function withSession(handler: NextIronHandler) {
  if (!process.env.SECRET_COOKIE_PASSWORD || !process.env.AUTH_COOKIE_NAME) {
    throw new Error(
      'No es posible crear la sesión, no existen las variables de entorno adecuadas.',
    );
  }

  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD, // NO DEBERÍA QUEDAR EN LIMPIO
    cookieName: process.env.AUTH_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
