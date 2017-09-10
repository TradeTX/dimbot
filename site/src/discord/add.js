const cfg = require('../../../config');

module.exports = (req, res) => {
  const guild = req.query.guild;
  res.redirect([
    'https://discordapp.com/oauth2/authorize',
    `?client_id=${cfg.id}`,
    guild ? `&guild_id=${guild}` : '',
    '&scope=bot',
    '&permissions=8'
  ].join(''));
};