const moment = require('moment');
const {cfg} = require('../../../bot');

exports.run = async msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in guilds');
  await msg.guild.fetchMembers();
  let oldestUser, oldestTimestamp = new Date();
  msg.guild.members.forEach(member => {
    const user = member.user;
    if (user.createdTimestamp < oldestTimestamp) {
      oldestTimestamp = user.createdTimestamp;
      oldestUser = user;
    }
  });
  msg.channel.send({embed: {
    author: {
      name: 'Oldest User',
      icon_url: oldestUser.displayAvatarURL || cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    description: `${oldestUser}`
  }});
};

exports.options = {
  format: '%prefix%oldestuser',
  description: 'Gets oldest user in current guild'
};