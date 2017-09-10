const {cfg} = require('../../../bot');

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.reply('you dont\'t have the ability to delete messages');
  if (!msg.guild.me.permissions.has('MANAGE_MESSAGES')) return msg.reply('i dont\'t have the ability to delete messages');
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}clear {@user/number}`);
  if (msg.mentions.users.first()) {
    msg.channel.fetchMessages({limit: 100}).then(messages => {
      msg.channel.bulkDelete(messages.filter(m => m.author.id === msg.mentions.users.first().id));
    });
  } else {
    const num = Math.floor(parseInt(args[0]) + 1);
    if (num < 2) return msg.reply('I can\'t delete less than 2 messages');
    if (num > 100) {
      let hundreds = Math.floor(num / 100);
      let remainder = num % 100;
      for (let i = 0; i < hundreds; i++) {
        if (i === hundreds) {
          msg.channel.bulkDelete(remainder).then(() => {
            msg.reply(`deleted ${args[0]} message${args[0] === '1' ? '' : 's'} 👌`).then(m => {
              setTimeout(() => {
                m.delete();
              }, 3000);
            });
          });
        } else {
          await msg.delete(100);
        }
      }
    } else {
      msg.channel.bulkDelete(num).then(() => {
        msg.reply(`deleted ${args[0]} ${args[0] === '1' ? 'message' : 'messages'} 👌`).then(m => {
          setTimeout(() => m.delete(), 3000);
        });
      });
    }
  }
};

exports.options = {
  aliases: ['delete'],
  format: '%prefix%clear {@user/number}',
  description: 'Clears messages'
};