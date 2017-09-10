const {cfg} = require('../../../bot');
const moment = require('moment');
const levels = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: '(╯°□°）╯︵ ┻━┻',
  4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

exports.run = msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  const guild = msg.guild;
  const created = new Date(guild.createdTimestamp);
  msg.channel.send({embed: {
    author: {
      name: guild.name,
      icon_url: guild.iconURL || cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    fields: [
      {
        name: '📍 Created',
        value: moment(created).format('MMMM Do YYYY'),
        inline: true
      },
      {
        name: '👌 Emojis',
        value: `${guild.emojis.size} emoji${guild.emojis.size === 1 ? '' : 's'}`,
        inline: true
      },
      {
        name: '💻 Icon',
        value: guild.iconURL ? `[URL](${guild.iconURL})` : 'None',
        inline: true
      },
      {
        name: '🆔 ID',
        value: guild.id,
        inline: true
      },
      {
        name: '👤 Owner',
        value: `${guild.owner}`,
        inline: true
      },
      {
        name: '👥 Member Count',
        value: guild.members.size,
        inline: true
      },
      {
        name: '✅ Verification',
        value: levels[guild.verificationLevel],
        inline: true
      },
      {
        name: `🌟 Roles`,
        value: `${guild.roles.size} roles`,
        inline: true
      }
    ],
    thumbnail: {
      url: guild.iconURL ? guild.iconURL : null
    }
  }});
};

exports.options = {
  aliases: ['server'],
  format: '%prefix%guild',
  description: 'Displays info about server'
};
