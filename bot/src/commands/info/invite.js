const {cfg} = require('../../../bot');

exports.run = msg => {
  msg.channel.send(`${cfg.site}/add`);
};

exports.options = {
  aliases: ['add'],
  format: '%prefix%invite',
  description: 'Generates my invite link'
};