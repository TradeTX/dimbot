const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MANAGE_CHANNELS')) return msg.reply('you dont\'t have the ability to delete channels');
  if (!msg.guild.me.permissions.has('MANAGE_CHANNELS')) return msg.reply('i dont\'t have the ability to delete channels');
  if (msg.channel.type !== 'text') return msg.channel.send('This command can only be used in guilds');
  msg.channel.send('Are you sure you want to purge this channel?\nPress ✅ to confirm or ❌ to cancel\nYou have 30 seconds to choose').then(async sent => {
    const emojis = ['✅', '❌'];
    sent.awaitReactions(
      (r, u) => emojis.includes(r.emoji.name) && u.id === msg.author.id,
      {max: 1, time: 30000}
    ).then(reactions => {
      switch (reactions.first().emoji.name) {
        case '✅':
          msg.channel.clone().then(channel => {
            channel.setPosition(msg.channel.position + 1);
            msg.channel.delete().then(() => {
              channel.send('Enjoy your new channel!').then(m => {
                setTimeout(() => {
                  m.delete();
                }, 10000)
              });
            }).catch(err => {
              msg.channel.send(`I can't delete ${msg.channel}`).then(() => {
                sent.delete();
              });
              channel.delete();
            });
          });
          break;
        case '❌':
          msg.delete();
          sent.delete();
          break;
      }
    }).catch(() => sent.edit('Time\'s up!'));
    for (const emoji of emojis) {
      await sent.react(emoji);
    }
  });
};

exports.options = {
  aliases: ['delchannel'],
  description: 'Duplicates and deletes current channel'
};