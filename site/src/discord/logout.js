module.exports = (req, res) => {
  req.session.reset();
  res.redirect('/');
};