const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (!req.session.access_token) return res.redirect('/login');
  const serverData = await fetch('https://discordapp.com/api/v6/users/@me/guilds', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
  const serverJson = await serverData.json();
  const servers = serverJson.filter(obj => obj.permissions === 2146958591);
  const userData = await fetch('https://discordapp.com/api/v6/users/@me', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
  const user = await userData.json();
  res.render('servers', {
    loggedIn: true,
    servers,
    user
  });
};