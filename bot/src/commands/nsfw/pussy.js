const fetch = require('node-fetch');
const {cfg} = require('../../../bot');
const subs = [
  'pussy',
  'rearpussy',
  'vagina'
];

exports.run = (msg, args) => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  fetch(`https://api.imgur.com/3/gallery/r/${subs[Math.floor(Math.random() * subs.length)]}`, {headers:{Authorization:`CLIENT-ID ${cfg.api.imgur_token}`}}).then(async res => {
    const json = await res.json();
    const img = json.data[Math.floor(Math.random() * json.data.length)];
    msg.channel.send({embed: {
      author: {
        name: 'Pussy Pic',
        icon_url: cfg.icon,
        url: `https://imgur.com/${img.id}`
      },
      color: cfg.color,
      image: {
        url: img.link
      }
    }});
  });
};

exports.options = {
  description: 'Pussy pic (not a cat)'
};