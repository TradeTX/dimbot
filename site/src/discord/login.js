const cfg = require('../../../config');

module.exports = (req, res) => {
  req.session.reset();
  res.redirect([
    'https://discordapp.com/oauth2/authorize',
    `?client_id=${cfg.id}`,
    '&scope=identify+guilds',
    '&response_type=code',
    `&callback_uri=https://${req.get('host')}/authorize`
  ].join(''));
};