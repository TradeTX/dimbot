const fetch = require('node-fetch');
const { cfg } = require('../../../bot');

exports.run = msg => {
  fetch('https://nekos.life/api/neko').then(async res => {
    const json = await res.json();
    msg.channel.send({embed: {
      author: {
        name: 'Neko',
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
  description: 'Neko image from nekos.life'
};