const fetch = require('node-fetch');
const btoa = require('btoa');
const cfg = require('../../../config');

module.exports = (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${cfg.id}:${cfg.client_secret}`);
  fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`
    }
  }).then(async response => {
    const json = await response.json();
    if (json.error) return res.redirect('/login');
    req.session.access_token = json.access_token;
    req.session.refresh_token = json.refresh_token;
    res.redirect('/servers');
  }).catch(err => {
    throw new Error(err);
  });
};