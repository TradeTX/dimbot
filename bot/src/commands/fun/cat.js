const fetch = require('node-fetch');
const { cfg } = require('../../../bot');

exports.run = msg => {
  fetch('https://random.cat/meow').then(async res => {
    const json = await res.json();
    msg.channel.send({embed: {
      author: {
        name: 'Random Cat',
        icon_url: 'https://random.cat/favicon.ico',
        url: 'https://random.cat'
      },
      color: cfg.color,
      image: {
        url: json.file
      }
    }});
  });
};

exports.options = {
  aliases: ['randomcat'],
  format: '%prefix%cat',
  description: 'The cat command EVERY bot has'
};