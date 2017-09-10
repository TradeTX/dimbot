const {cfg} = require('../../../bot');
const roles = require('../../utils/roles');

exports.run = (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MANAGE_ROLES')) return msg.reply('you dont\'t have the ability to make roles');
  if (!msg.guild.me.permissions.has('MANAGE_ROLES')) return msg.reply('i dont\'t have the ability to make roles');
  let highestRole, highestRolePosition = 0;
  for (const role of msg.guild.roles.array()) {
    if (role.position < highestRolePosition) continue;
    highestRolePosition = role.position;
    highestRole = role;
  }
  if (!msg.guild.me.highestRole.equals(highestRole)) return msg.channel.send(`Please move my "Dim" role to the top of all the roles\nOnly ${msg.guild.owner} can do this`);
  msg.channel.send('Do you want to [✅]Enable or [❌]Disable custom color roles?').then(async sent => {
    const emojis = ['✅', '❌'];
    sent.awaitReactions(
      (r, u) => emojis.includes(r.emoji.name) && u.id === msg.author.id,
      {max: 1, time: 30000}
    ).then(async reactions => {
      let i = 0;
      switch (reactions.first().emoji.name) {
        case '✅':
          const pos = msg.guild.me.highestRole.position;
          for (const role in roles) {
            if (msg.guild.roles.some(guildRole => guildRole.name === role)) continue;
            await msg.guild.createRole({
              name: role,
              color: roles[role],
              position: pos + i
            }).catch(console.log);
            i++;
          }
          sent.clearReactions();
          sent.edit(`Added ${i} color role${i === 1 ? '' : 's'}`);
          break;
        case '❌':
          for (const role in roles) {
            if (!msg.guild.roles.some(guildRole => guildRole.name === role)) continue;
            await msg.guild.roles.find('name', role).delete();
            i++;
          }
          sent.clearReactions();
          sent.edit(`Deleted ${i} color role${i === 1 ? '' : 's'}`);
          break;
      }
    }).catch(() => sent.edit('Time\'s up!'));
    for (const emoji of emojis) {
      await sent.react(emoji);
    }
  });
};

exports.options = {
  description: 'Configure color roles'
};