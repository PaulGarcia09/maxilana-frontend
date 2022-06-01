import { withIronSession } from 'next-iron-session';
import { NextIronHandler } from '~/types/IronSession';

export default function withCartSession(handler: NextIronHandler) {
  if (!process.env.SECRET_CART_COOKIE_PASSWORD || !process.env.CART_COOKIE_NAME) {
    throw new Error(
      'No es posible crear el carrito, no existen las variables de entorno adecuadas.',
    );
  }

  return withIronSession(handler, {
    password: process.env.SECRET_CART_COOKIE_PASSWORD,
    cookieName: process.env.CART_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
