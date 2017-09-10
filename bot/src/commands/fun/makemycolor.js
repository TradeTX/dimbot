const { cfg } = require('../../../bot');
const roles = require('../../utils/roles');

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  const color = args.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const colorRoles = [];
  for (role in roles) {
    if (msg.guild.roles.some(guildRole => guildRole.name === role)) {
      colorRoles.push(role);
    }
  }
  if (!colorRoles.length) return msg.reply('Sorry, this server doesn\'t have color roles enabled');
  if (!msg.guild.me.permissions.has('MANAGE_ROLES')) return msg.reply('i don\'t have the ability to give roles');
  if (!(color && colorRoles.includes(color))) {
    msg.channel.send({embed: {
      author: {
        name: 'Colors',
        icon_url: cfg.icon,
        url: cfg.site
      },
      color: cfg.color,
      description: colorRoles.join('\n')
    }});
    return;
  }
  for (role in roles) {
    if (msg.guild.roles.some(guildRole => guildRole.name === role)) await msg.member.removeRole(msg.guild.roles.find('name', role));
  }
  msg.member.addRole(msg.guild.roles.find('name', color)).then(() => msg.reply(`your color is now ${msg.guild.roles.find('name', color)}`));
};

exports.options = {
  aliases: ['makemycoulour', 'changecolor', 'changecolour', 'setcolor', 'setcolour', 'colorme', 'colourme'], // Fuckin brits
  description: 'Configure color roles'
};