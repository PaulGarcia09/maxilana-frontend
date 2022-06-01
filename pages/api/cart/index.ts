import { getCart } from '~/modules/api/cart';
import withCartSession from '~/modules/lib/withCartSession';

export default withCartSession(async (req, res) => {
  const token = req.session.get('cart');

  try {
    if (token) {
      const cart = await getCart(token);
      res.json(cart);
    } else {
      res.json([]);
    }
  } catch (err) {
    res
      .status(422)
      // @ts-ignore
      .json({ errors: [{ message: `Ocurrió un error al traer el carrito. ${err?.message}` }] });
  }
});
