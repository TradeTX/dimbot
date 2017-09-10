const {cfg} = require('../../../bot');

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  let id;
  if (/^\d+$/.test(args[0])) {
    id = args[0];
  } else {
    msg.channel.fetchMessages({limit: 2}).then(messages => {
      const m = messages.last();
      msg.channel.send({embed: {
        author: {
          name: m.author.tag,
          icon_url: m.author.displayAvatarURL,
          url: cfg.site
        },
        color: m.member.displayHexColor === '#000000' ? cfg.color : m.member.displayColor,
        description: m.content
      }});
    }).catch(() => msg.reply('couldn\'t get second to last message'));
  }
};

exports.options = {
  aliases: ['repeat'],
  format: '%prefix%quote <id>',
  description: 'Quotes the supplied message ID or the most recent message'
};