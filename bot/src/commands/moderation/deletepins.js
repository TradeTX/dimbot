const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.reply('you dont\'t have the ability to delete pins');
  if (!msg.guild.me.permissions.has('MANAGE_MESSAGES')) return msg.reply('i dont\'t have the ability to delete pins');
  if (msg.channel.type !== 'text') return msg.channel.send('This command can only be used in guilds');
  msg.channel.send('Are you sure you want to delete all pins?\nPress ✅ to confirm or ❌ to cancel\nYou have 30 seconds to choose').then(async sent => {
    const emojis = ['✅', '❌'];
    sent.awaitReactions(
      (r, u) => emojis.includes(r.emoji.name) && u.id === msg.author.id,
      {max: 1, time: 30000}
    ).then(reactions => {
      switch (reactions.first().emoji.name) {
        case '✅':
          msg.channel.fetchPinnedMessages().then(async pinned => {
            for (const pin of pinned.array()) {
              await pin.unpin();
            }
            sent.edit('All pins unpinned');
            setTimeout(() => {
              msg.delete();
              sent.delete();
            }, 5000);
          });
          break;
        case '❌':
          msg.delete();
          sent.delete();
          break;
      }
    });
  });
};

exports.options = {
  aliases: ['removepins', 'delpins'],
  description: 'Deletes all pins in current channel'
};