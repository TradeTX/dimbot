const {cfg} = require('../../../bot');
const Discord = require('discord.js');

exports.run = (msg, args) => {
  if (msg.channel.type !== 'dm') return msg.reply('do NOT try to use that command here, ONLY in DM\'s');
  if (!(args[0] && args[1])) return msg.reply(`no info provided, please type ${cfg.prefix}me {token} {game}\nIf you don't know how to get your token, check this guide:\n`);
  let token = args[0].replace(/["']/g, '');
  if (!/^[A-Za-z0-9_.-]{59}$/.test(token)) return msg.reply('not a valid token!');
  let game = args.splice(1).join(' ');
  msg.channel.send(`Changing game to ${game}`).then(m => {
    const client = new Discord.Client();
    client.on('ready', () => client.user.setGame(game).then(() => m.edit(`Changed game to ${game}`)));
    client.login(token).catch(err => m.edit('Error getting profile'));
  });
}
