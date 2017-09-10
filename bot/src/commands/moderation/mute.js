const moment = require('moment');
const fs = require('fs');
const { cfg } = require('../../../bot');
const jsonFile = './muted.json';

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  if (!msg.member.permissions.has('MUTE_MEMBERS')) return msg.reply('you dont\'t have the ability to mute members');
  const member = msg.mentions.members.first();
  if (!member) return msg.channel.send(`Invalid usage, please use: \`${cfg.prefix}mute {@user} <{number}{s|m|h|d|w|M|y}> <reason>\``);
  const timeRaw = args.splice(0, 2)[1];
  const reason = args.join(' ');
  // console.log(reason);
  const dm = await member.createDM();
  const muteRole = msg.guild.roles.find('name', 'Dim Mute') || await msg.guild.createRole({
    name: 'Dim Mute',
    color: cfg.color,
    permissions: 0,
    position: msg.guild.me.highestRole.position - 1
  });
  const textChannels = msg.guild.channels.filter(c => c.type === 'text');
  if (!textChannels.every(channel => channel.permissionOverwrites.get(muteRole.id))) {
    textChannels.forEach(async channel => {
      await channel.overwritePermissions(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
  }
  if (member.roles.has(muteRole.id)) return msg.channel.send(`"${member.nickname || member.user.username}" is already muted, use \`${cfg.prefix}unmute\``);
  if (timeRaw) {
    let num = timeRaw.replace(/[^\d]/, ''), time, bad;
    if (timeRaw.endsWith('s')) {
      time = num * 1000;
      if (num > 100 * 365 * 24 * 60 * 60) bad = true;
    } else if (timeRaw.endsWith('m')) {
      time = num * 1000 * 60;
      if (num > 100 * 365 * 24 * 60) bad = true;
    } else if (timeRaw.endsWith('h')) {
      time = num * 1000 * 60 * 60;
      if (num > 100 * 365 * 24) bad = true;
    } else if (timeRaw.endsWith('d')) {
      time = num * 1000 * 60 * 60 * 24;
      if (num > 100 * 365) bad = true;
    } else if (timeRaw.endsWith('w')) {
      time = num * 1000 * 60 * 60 * 24 * 7;
      if (num > 100 * 52) bad = true;
    } else if (timeRaw.endsWith('M')) {
      time = num * 1000 * 60 * 60 * 24 * 30;
      if (num > 100 * 12) bad = true;
    } else if (timeRaw.endsWith('y')) {
      time = num * 1000 * 60 * 60 * 24 * 365;
      if (num > 100) bad = true;
    } else {
      time = num;
      if (num > 100 * 365 * 24 * 60 * 60 * 1000) bad = true;
      if (num < 1000) return msg.channel.send('Number is too low');
    }
    dm.send(`You have been muted by **"${msg.author.tag}"** in **"${msg.guild.name}"** and will be unmuted in **${moment().add(time).fromNow()}** ${reason ? `because "${reason}"` : ''}`).catch();
    msg.channel.send(`"${member.nickname || member.user.username}" will be unmuted in **${moment().add(time).fromNow()}** ${reason ? `because "${reason}"` : ''}`);
    member.addRole(muteRole);
    const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    if (!json[msg.guild.id]) json[msg.guild.id] = {};
    json[msg.guild.id][member.id] = Date.now() + time;
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2), 'utf8');
    if (num) setTimeout(() => {
      member.removeRole(muteRole);
      const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      delete json[msg.guild.id][member.id];
      fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2), 'utf8');
    }, time);
    if (bad) return msg.channel.send(`"${member.nickname || member.user.username}" has a better chance of dying before the unmute runs out, please use a lower number`);
  } else {
    member.addRole(muteRole);
    msg.channel.send(`"${member.nickname || member.user.username}" has been muted`);
    dm.send(`You have been muted by **"${msg.author.tag}"** in **"${msg.guild.name}"** and will be unmuted when an admin chooses to`).catch();
  }
};

exports.options = {
  aliases: ['block'],
  format: '%prefix%mute {@user} <{number}<s|m|h|d|w|M|y>> <reason>'
};