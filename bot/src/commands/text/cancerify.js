const cancerify = require('../../utils/cancerify');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}cancerify {text}`);
  const text = args.join(' ');
  msg.channel.send(cancerify(text));
};

exports.options = {
  aliases: ['autism'],
  format: '%prefix%cancerify {text}'
};