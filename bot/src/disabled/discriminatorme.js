const cfg = require('../../../../config');
const {bot} = require('../../../bot');
const Discord = require('discord.js');
exports.run = (msg, args) => {
  if (msg.channel.type !== 'dm') return msg.delete().catch(err => {}).then(() => msg.reply('do NOT try to use that command here, ONLY in DM\'s'));
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}me {token}\nIf you don't know how to get your token, check this guide:\n`);
  let token = args[0].replace(/["']/g, '');
  if (!/^[A-Za-z0-9_.-]{59}$/.test(token)) return msg.reply('not a valid token!');
  const user = msg.mentions.users.first() || msg.author;
  const client = new Discord.Client();
  client.on('ready', () => {
    const names = [];
    for (const i of client.guilds.array()) {
      i.fetchMembers().then(() => {
        for (const e of i.members.array()) {
          if (e.user.discriminator === user.discriminator && e.user.username !== user.username) {
            msg.channel.send(e.user.tag);
          }
        }
      });
    }
  });
  client.login(token);
}
