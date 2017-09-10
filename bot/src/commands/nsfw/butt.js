const fetch = require('node-fetch');
const {cfg} = require('../../../bot');

exports.run = msg => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  (retry = () => {
    const rand = (Math.floor(Math.random() * 4998)).toString();
    const num = ('00000' + rand).substring(rand.length);
    const img = `http://media.obutts.ru/butts/${num}.jpg`;
    fetch(img).then(res => {
      if (!res.ok) return retry();
      msg.channel.send({embed: {
        author: {
          name: 'Butt Pic',
          icon_url: cfg.icon,
          url: cfg.site
        },
        color: cfg.color,
        image: {
          url: img
        }
      }});
    }).catch(retry);
  })();
};

exports.options = {
  aliases: ['ass', 'butts'],
  description: 'Butt pic'
};