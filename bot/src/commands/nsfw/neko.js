const fetch = require('node-fetch');
const {cfg} = require('../../../bot');

exports.run = msg => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  fetch('https://nekos.life/api/lewd/neko').then(async res => {
    const json = await res.json();
    msg.channel.send({embed: {
      author: {
        name: 'NSFW Neko',
        icon_url: cfg.icon,
        url: cfg.site
      },
      color: cfg.color,
      image: {
        url: json.neko
      }
    }});
  });
};

exports.options = {
  description: 'NSFW Neko image from nekos.life/lewd'
};