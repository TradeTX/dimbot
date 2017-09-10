const emojify = require('../../utils/emojify');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}emojify {text}`);
  const text = args.join(' ');
  msg.channel.send(`\`${emojify(text)}\``);
};

exports.options = {
  aliases: ['emoji'],
  format: '%prefix%emojify {text}'
};