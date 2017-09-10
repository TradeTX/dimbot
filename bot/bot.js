// Dependencies
const Discord = require('discord.js');
const glob = require('glob');
const {inspect} = require('util');
const redis = require('../redis');
const cfg = require('../config');
const profanity = require('./src/utils/profanity.json');
const emojify = require('./src/utils/emojify.js');
const moment = require('moment');

// Variable declaration
const bot = new Discord.Client();
const dir = cfg.dir ? cfg.dir.replace(/\/$/, '') : './src';
const commands = {};
const time = new Date();

module.exports = {
  Discord,
  redis,
  glob,
  time,
  bot,
  cfg
};

const commandFiles = glob.sync(`${dir}/commands/**/*.js`);
const eventFiles = glob.sync(`${dir}/events/**/*.js`);
for (const file of commandFiles) {
  const name = file.replace(/.*\/(.*)\.js/g, '$1');
  commands[name] = file;
  const req = require(file);
  if (req.options && req.options.aliases) {
    for (const alias of req.options.aliases) {
      commands[alias] = file;
    }
  }
}
for (const file of eventFiles) {
  const name = file.replace(/.*\/(.*)\.js/g, '$1');
  bot.on(name, (...args) => require(file).run(...args));
}

bot.on('message', async msg => {
  // if (msg.content === 'f') return msg.channel.send('**Respects have been paid**');

  // == Personal Stuff ==
  if (msg.channel.id === '348688683731386368') {
    if (!/^(?:Click this link to add as friend in Clash Royale\!\n)?https:\/\/link\.clashroyale\.com\/invite\/friend\/[a-z]{2}\?tag=[0289CGJLPQRUVY]+&token=[a-z0-9]+&platform=\w+$/.test(msg.content.trim())
    &&  !msg.author.equals(bot.user)) {
      msg.reply('invalid CR link').then(m => setTimeout(() => m.delete(), 5000));
      return msg.delete();
    }
  }
  // ==/Personal Stuff/==

  // if (msg.channel.type === 'text' && !msg.member.hasPermission('ADMINISTRATOR')) {
  //   let profane = false;
  //   for (const word of profanity) {
  //     if (msg.content.includes(word)) {
  //       msg.delete();
  //       profane = true;
  //       break;
  //     }
  //   }
  //   if (profane) return;
  // }
  if (!msg.content.startsWith(cfg.prefix) && !msg.content.startsWith(bot.user) || msg.author.bot) return;
  const args = msg.content.split(/ +/);
  let ran;
  if (msg.content.startsWith(bot.user)) {
    if (args[1]) {
      ran = args.splice(0, 2)[1].toLowerCase();
    } else {
      for (emoji of ['🇩','🇮','🇲','🇧','🇴','🇹','⚫','🇽','🇾','🇿']) {
        await msg.react(emoji).catch();
      }
    }
  } else {
    ran = args.shift().slice(cfg.prefix.length).toLowerCase();
  }
  if (ran in commands) {
    try {
      const file = require(commands[ran]);
      file.run(msg, args, bot);
      console.log(`Command "${ran}" in ${msg.channel.type === 'text' ? `"${msg.guild.name}"` : 'DM'} by "${msg.author.tag}" on ${moment().format('MMMM Do [at] h:mm:ss a')}`);
    } catch(err) {
      console.log(err);
      msg.channel.send('An error occured');
    }
  }
});

bot.login(cfg.token);