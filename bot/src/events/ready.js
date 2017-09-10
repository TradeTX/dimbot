const log = console.log;
const fs = require('fs');
const { bot, cfg, redis } = require('../../bot');
const jsonFile = './muted.json';

exports.run = async () => {
  redis.set('guildCount', bot.guilds.size);
  if (bot.user.username !== cfg.username) {
    log(`Bot username is ${bot.user.username}, but should be ${cfg.username}`);
    bot.user.setUsername(cfg.username).catch(err => {
      log(`Couldn't change username to ${bot.user.username}, please check config.js\nError:\n${err}`);
    });
  }
  bot.user.setGame(`${cfg.prefix}help | ${cfg.prefix}invite`, cfg.twitch);
  // Handle Muted Users
  if (!fs.existsSync(jsonFile)) fs.writeFileSync(jsonFile, '');
  if (fs.readFileSync(jsonFile, 'utf8') === '') fs.writeFileSync(jsonFile, JSON.stringify({}, null, 2), 'utf8');
  const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  for (const guild in json) {
    for (const member in json[guild]) {
      const time = json[guild][member];
      if (Date.now() >= time) {
        try {
          await bot.guilds.get(guild).members.get(member).removeRole(bot.guilds.get(guild).roles.find('name', 'Dim Mute'));
        } catch(err) {
          console.log(err);
        }
        delete json[guild][member];
      } else {
        setTimeout(async () => {
          const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
          try {
            await bot.guilds.get(guild).members.get(member).removeRole(bot.guilds.get(guild).roles.find('name', 'Dim Mute'));
          } catch(err) {
            console.log(err);
          }
          delete json[guild][member];
          fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2), 'utf8');
        }, time - Date.now());
      }
    }
  }
  fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2), 'utf8');
  // Handle Muted Users
};