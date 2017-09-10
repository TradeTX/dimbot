const fetch = require('node-fetch');
const redis = require('../../redis');

module.exports = async (req, res) => {
  const guildCount = await redis.getAsync('guildCount');
  if (req.session.access_token) {
    const userData = await fetch('https://discordapp.com/api/v6/users/@me', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
    const user = await userData.json();
    res.render('index', {
      loggedIn: true,
      guildCount,
      user
    });
  } else {
    res.render('index', {
      guildCount,
      loggedIn: false
    });
  }
};