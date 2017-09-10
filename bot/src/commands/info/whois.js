const {bot, cfg} = require('../../../bot');
const {lookup} = require('whois');
const hastebin = require('hastebin-generator');

exports.run = (msg, args) => {
  if (!args[0]) return msg.channel.send(`no info provided, please type ${cfg.prefix}whois {website.com}`);
  lookup(args[0], (err, data) => {
    if (err) throw err;
    hastebin(data, 'txt').then(url => {
      msg.channel.send(url);
    }).catch(console.log);
  });
};

exports.options = {
  aliases: ['lookup'],
  format: '%prefix%whois {website.com}',
  description: 'WHOIS info for domain'
};