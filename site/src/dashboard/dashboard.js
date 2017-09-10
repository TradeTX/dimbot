const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (!req.session.access_token) return res.redirect('/login');
  if (!req.params.id) return res.redirect('/servers');
  const serverData = await fetch('https://discordapp.com/api/v6/users/@me/guilds', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
  const serverJson = await serverData.json();
  const server = serverJson.find(obj => obj.id === req.params.id);
  if (!server) return res.send('<script>window.location = "/servers"</script>');
  const userData = await fetch('https://discordapp.com/api/v6/users/@me', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
  const user = await userData.json();
  res.render('dashboard', {
    loggedIn: true,
    server,
    user
  });
};