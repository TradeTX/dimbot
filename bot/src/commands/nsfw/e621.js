const fetch = require('node-fetch');
const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  const tags = args.join(' ');
  fetch(`https://e621.net/post/index.json?tags=${encodeURIComponent(tags)}&limit=100`).then(async res => {
    const json = await res.json();
    const filtered = json.filter(post => post.file_ext === 'jpg' || post.file_ext === 'png' || post.file_ext === 'gif');
    const post = filtered[Math.floor(Math.random() * filtered.length)];
    msg.channel.send({embed: {
      author: {
        name: `E621 "${tags}"`,
        icon_url: cfg.icon,
        url: cfg.site
      },
      color: cfg.color,
      image: {
        url: post.file_url
      }
    }});
  });
};

exports.options = {
  aliases: ['furry'],
  format: '%prefix%e621 <tag>',
  description: 'Furry images from e621.net'
};