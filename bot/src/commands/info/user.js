const {bot, cfg} = require('../../../bot');
const emojify = require('../../utils/emojify');
const moment = require('moment');

exports.run = msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  const member = msg.mentions.members.first() || msg.member;
  const created = new Date(member.user.createdTimestamp);
  const joined = new Date(member.joinedTimestamp);
  const roles = [];
  member.roles.map(role => role.name === '@everyone' ? null : roles.push(role));
  msg.channel.send({embed: {
    author: {
      name: member.user.tag,
      icon_url: member.user.avatarURL,
      url: cfg.site
    },
    color: member.displayHexColor === '#000000' ? cfg.color : member.displayColor,
    fields: [
      {
        name: '👤 Avatar',
        value: `[URL](${member.user.displayAvatarURL})`,
        inline: true
      },
      {
        name: '📍 Created',
        value: moment(created).format('MMMM Do YYYY'),
        inline: true
      },
      {
        name: '🆔 ID',
        value: member.user.id,
        inline: true
      },
      {
        name: '📌 Joined',
        value: moment(joined).format('MMMM Do YYYY'),
        inline: true
      },
      {
        name: '👥 Nickname',
        value: member.nickname || 'none',
        inline: true
      },
      {
        name: '🕹 Playing',
        value: member.presence.game ? member.presence.game.name : 'none',
        inline: true
      },
      {
        name: '☄ Status',
        value: member.presence.status || 'none',
        inline: true
      },
      {
        name: `🌟 Role${roles.length === 1 ? '' : 's'}`,
        value: roles.join(', ') || 'none',
        inline: true
      }
    ]
  }}).then(async m => {
    for (emoji of emojify(member.user.username).split(' ').splice(1)) {
      await m.react(emoji).catch(console.log);
    }
  });
};

exports.options = {
  aliases: ['memberinfo', 'userinfo', 'info'],
  format: '%prefix%user {@user}',
  description: 'Displays info about user'
};