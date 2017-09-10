const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}b {text} {1-2}`);
  const lastArg = args[args.length - 1];
  if (lastArg === '1' || lastArg === '2') {
    args.pop();
    const text = args.join(' ');
    if (lastArg === '1') {
      msg.channel.send(text.replace(/b/gi, '🅱'));
    } else if (lastArg === '2') {
      msg.channel.send(text.replace(/[bogf]/gi, '🅱'));
    }
  } else {
    const text = args.join(' ');
    msg.channel.send(text.replace(/b/gi, '🅱'));
  }
};

exports.options = {
  aliases: [],
  format: '%prefix%b {text} <1/2>'
};