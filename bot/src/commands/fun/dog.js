const fetch = require('node-fetch');
const { cfg } = require('../../../bot');

exports.run = msg => {
  fetch('https://random.dog/woof').then(async res => {
    const text = await res.text();
    msg.channel.send({embed: {
      author: {
        name: 'Random Dog',
        icon_url: 'https://random.dog/favicon.ico',
        url: 'https://random.dog'
      },
      color: cfg.color,
      image: {
        url: `https://random.dog/${text}`
      }
    }});
  });
};

exports.options = {
  aliases: ['randomdog'],
  format: '%prefix%dog',
  description: 'The dog command EVERY bot has'
};