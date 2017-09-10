const cfg = require('../../../../config');
const vaporize = require('../../utils/vaporize');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}vaporize {text}`);
  const text = args.join(' ');
  msg.channel.send(vaporize(text));
};

exports.options = {
  aliases: ['vapor', 'vaporwave'],
  format: '%prefix%vaporize {text}'
};