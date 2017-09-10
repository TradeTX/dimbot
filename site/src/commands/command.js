const cfg = require('../../../config');

module.exports = async (req, res) => {
  if (req.session.access_token) {
    const userData = await fetch('https://discordapp.com/api/v6/users/@me', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
    const user = await userData.json();
    res.render('commands', {
      loggedIn: true,
      commands,
      user
    });
  } else {
    res.render('commands', {
      loggedIn: false,
      commands
    });
  }
};