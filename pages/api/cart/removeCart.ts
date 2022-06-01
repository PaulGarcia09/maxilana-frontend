import withCartSession from '~/modules/lib/withCartSession';

export default withCartSession(async (req, res) => {
  if (req?.body.remove) {
    req.session.destroy();
    res.json({ response: 'ok' });
  } else {
    res.status(422).json({
      errors: [{ message: 'No fue posible eliminar el carrito' }],
    });
  }
});
