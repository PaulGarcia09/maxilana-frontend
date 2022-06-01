import { createCart } from '~/modules/api/cart';
import addItem from '~/modules/api/cart/addItem';
import withCartSession from '~/modules/lib/withCartSession';

export default withCartSession(async (req, res) => {
  const { pid } = req.body;
  const token = req.session.get('cart');

  try {
    if (!pid) {
      throw new Error('No se envió ningún producto para agregar.');
    }

    if (!token) {
      // Si no hay carrito, lo creamos...
      const cart = await createCart(pid as string);

      req.session.set('cart', cart.id);
      await req.session.save();

      res.json(cart);
    } else {
      // Si hay carrito, agregamos el producto...
      const cart = await addItem({ codigo: pid as string, orden: token });

      res.json(cart);
    }
  } catch (err) {
    res.status(422).json({
      // @ts-ignore
      errors: [{ message: `Ocurrió un error al actualizar el carrito. ${err?.message}` }],
    });
  }
});
