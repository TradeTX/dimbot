const moment = require('moment');
const log = console.log;
const { bot, cfg, redis } = require('../../bot');

exports.run = async guild => {
  redis.set('guildCount', bot.guilds.size);
  bot.user.setGame(`${cfg.prefix}help | ${cfg.prefix}invite`, cfg.twitch);
  const link = await guild.channels.first().createInvite() || 'no invite link';
  log(`Joined "${guild.name}" on ${moment().format('MMMM Do [at] h:mm:ss a')}\n${link}`);
};