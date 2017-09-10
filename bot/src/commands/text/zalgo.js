const cfg = require('../../../../config');
const zalgo = require('../../utils/zalgo');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}zalgo {text}`);
  const text = args.join(' ');
  msg.channel.send(zalgo(text));
};

exports.options = {
  aliases: ['fuckup'],
  format: '%prefix%zalgo {text}',
};