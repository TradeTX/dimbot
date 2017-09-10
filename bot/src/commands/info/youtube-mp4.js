const {cfg} = require('../../../bot');
const ytdl = require('ytdl-core');
const haste = require('hastebin-generator');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}youtube-mp4 {url}`);
  const url = args.join(' ');
  msg.channel.send(`https://dimbot.xyz/youtube-mp4?url=${url}`);
};

exports.options = {
  aliases: ['yttomp4', 'ytmp4', 'yt2mp4', 'yt-mp4'],
  format: '%prefix%youtube {url}',
  description: 'Gets info for a youtube video'
};