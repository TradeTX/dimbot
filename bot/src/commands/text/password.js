const { Util } = require('discord.js');
const levels = {
  1: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  2: '0123456789',
  3: '!@#$%^&*()_+~`|}{[]\\:;?><,./-='
}

exports.run = (msg, args) => {
  const length = args[0] || '16';
  if (length > 1000) return msg.channel.send('Length too high');
  if (length < 1) return msg.channel.send('Length too low');
  const intensity = args[1] || '1';
  if (intensity > 3) return msg.channel.send('Intensity too high');
  if (intensity < 1) return msg.channel.send('Intensity too low');
  const chars = intensity === '1'
    ? levels[1]
    : intensity === '2'
      ? levels[1] + levels[2]
      : levels[1] + levels[2] + levels[3];
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  msg.channel.send(Util.escapeMarkdown(password));
};

exports.options = {
  aliases: ['pw'],
  format: '%prefix%password <1-1000> <1-3(intensity)>'
};