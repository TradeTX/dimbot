const {cfg} = require('../../../bot');
const moment = require('moment');
const levels = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: '(╯°□°）╯︵ ┻━┻',
  4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

exports.run = async msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  await msg.channel.startTyping();
  await msg.guild.fetchMembers();
  const members = msg.guild.members;
  const streaming = members.filter(member => member.presence.game && member.presence.game.type).size;
  const online = members.filter(member => member.presence.status === 'online').size;
  const away = members.filter(member => member.presence.status === 'idle').size;
  const dnd = members.filter(member => member.presence.status === 'dnd').size;
  const offline = members.filter(member => member.presence.status === 'offline').size;
  const humans = members.filter(member => !member.user.bot).size;
  const bots = members.filter(member => member.user.bot).size;
  await msg.channel.stopTyping();
  msg.channel.send({embed: {
    author: {
      name: 'Members',
      icon_url: cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    description: [
      `👥 ${members.size} Total Member${members.size === 1 ? '' : 's'}`,
      '',
      `👤 ${humans} Human Member${humans === 1 ? '' : 's'}`,
      `🤖 ${bots} Bot Member${bots === 1 ? '' : 's'}`,
      '',
      `<:streaming:313956277132853248> ${streaming} Member${streaming === 1 ? '' : 's'} Streaming`,
      `<:online:313956277808005120> ${online} Member${online === 1 ? '' : 's'} Online`,
      `<:away:313956277220802560> ${away} Member${away === 1 ? '' : 's'} Away`,
      `<:dnd:313956276893646850> ${dnd} Member${dnd === 1 ? '' : 's'} On DND`,
      `<:offline:313956277237710868> ${offline} Member${offline === 1 ? '' : 's'} Offline`
    ].join('\n')
  }});
};

exports.options = {
  description: 'Displays stats about members'
};
