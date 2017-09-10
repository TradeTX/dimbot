const leetify = require('../../utils/leetify');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}leetify {text}`);
  const text = args.join(' ');
  msg.channel.send(leetify(text));
};

exports.options = {
  aliases: ['1337', 'leet'],
  format: '%prefix%leetify {text}'
};