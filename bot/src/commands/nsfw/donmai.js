const fetch = require('node-fetch');
const {cfg} = require('../../../bot');
const allowedImageFormats = [
  'webp',
  'png',
  'jpg',
  'gif'
];
const cache = {};

exports.run = async (msg, args) => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  const tags = args.join(' ');
  if (!cache[tags] || cache[tags].time < Date.now()) {
    msg.channel.startTyping();
    cache[tags] = {
      json: await fetch(`https://danbooru.donmai.us/posts.json?limit=200&tags=${encodeURIComponent(tags)}`)
        .then(res => res.json())
        .then(json => json.filter(post => !allowedImageFormats.includes(json.file_ext) && post.file_size <= 8388608)),
      time: Date.now() + (1000 * 60 * 30)
    }
    msg.channel.stopTyping();
  }
  if (!cache[tags].json.length) return msg.channel.send(`No results for "${tags}"`);
  const post = cache[tags].json[Math.floor(Math.random() * cache[tags].json.length)];
  msg.channel.send({embed: {
    author: {
      name: `Danbooru "${tags}"`,
      icon_url: cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    image: {
      url: `https://danbooru.donmai.us${post.file_url}`
    }
  }});
};

exports.options = {
  description: 'Images from donmai.us'
};