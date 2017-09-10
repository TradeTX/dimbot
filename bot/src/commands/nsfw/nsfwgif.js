const fetch = require('node-fetch');
const {cfg} = require('../../../bot');
const subs = [
  'porn_gifs',
  'nsfw_gifs',
  'nsfw_gif'
];

exports.run = (msg, args) => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  fetch(`https://api.imgur.com/3/gallery/r/${subs[Math.floor(Math.random() * subs.length)]}`, {headers:{Authorization:`CLIENT-ID ${cfg.api.imgur_token}`}}).then(async res => {
    const json = await res.json();
    const img = json.data[Math.floor(Math.random() * json.data.length)];
    msg.channel.send({embed: {
      author: {
        name: 'NSFW Gif',
        icon_url: cfg.icon,
        url: img.is_album ? img.link : `https://imgur.com/${img.id}`
      },
      color: cfg.color,
      image: {
        url: img.is_album ? img.images[Math.floor(Math.random() * img.images.length)].link : img.link
      }
    }});
  });
};

exports.options = {
  aliases: ['ng'],
  description: 'NSFW Gif (barely works)'
};