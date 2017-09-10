const fetch = require('node-fetch');

module.exports = (req, res) => {
  fetch('https://discordapp.com/api/guilds/314099968438829058/widget.json').then(response => {
    response.json().then(json => {
      res.redirect(json.instant_invite);
    });
  });
};