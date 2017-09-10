const {cfg} = require('../../../bot');

exports.run = msg => {
  if (msg.author.id !== cfg.ownerID) return msg.reply(`only <@${cfg.ownerID}> can use this command`);
  msg.reply('rebooting...');
  process.exit();
};
