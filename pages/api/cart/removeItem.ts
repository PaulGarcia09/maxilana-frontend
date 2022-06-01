import { removeItemCart } from '~/modules/api/cart';
import withCartSession from '~/modules/lib/withCartSession';

export default withCartSession(async (req, res) => {
  const { pid } = req.body;
  const token = req.session.get('cart');

  try {
    if (!token) {
      throw new Error('Este carrito ya no existe, vuelve a crear uno.');
    }

    if (!pid) {
      throw new Error('No se envió ningún producto para eliminar.');
    }

    const cart = await removeItemCart({ codigo: pid as string, orden: token });
    res.json(cart);
  } catch (err) {
    res.status(422).json({
      // @ts-ignore
      errors: [{ message: `Ocurrió un error al actualizar el carrito. ${err?.message}` }],
    });
  }
});
