import withSession from '~/modules/lib/withSession';

export default withSession(async (req, res) => {
  const user = req.session.get('user');

  if (user) {
    // Podriamos obtener la data del usuario..?
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});
