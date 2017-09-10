const moment = require('moment');
const fs = require('fs');
const { cfg } = require('../../../bot');
const jsonFile = './muted.json';

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MUTE_MEMBERS')) return msg.reply('you dont\'t have the ability to mute members');
  const member = msg.mentions.members.first();
  if (!member) return msg.channel.send(`Invalid usage, please use: \`${cfg.prefix}unmute {@user}\``);
  const muteRole = msg.guild.roles.find('name', 'Dim Mute');
  if (!member.roles.has(muteRole.id)) return msg.channel.send(`"${member.nickname || member.user.username}" is already unmuted`);
  member.removeRole(muteRole);
  member.createDM().then(dm => dm.send(`You have been unmuted by **"${msg.author.tag}"** in **"${msg.guild.name}"**`).catch());
  msg.channel.send(`"${member.nickname || member.user.username}" has been unmuted`);
  const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  delete json[msg.guild.id][member.id];
  fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2), 'utf8');
};

exports.options = {
  aliases: ['unblock'],
  format: '%prefix%unmute {@user}'
};