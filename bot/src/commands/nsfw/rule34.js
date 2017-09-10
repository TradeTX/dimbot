const fetch = require('node-fetch');
const {parseString} = require('xml2js');
const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (!msg.channel.nsfw && msg.channel.type === 'text') return msg.channel.send('This command only works in NSFW channels or DM');
  const tags = args.join(' ');
  fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=100&tags=${encodeURIComponent(tags)}`).then(async res => {
    const xml = await res.text();
    parseString(xml, (err, xml) => {
      const posts = xml.posts;
      if (posts['$'].count === '0') return msg.reply(`🚫 No image/gif results for "${tags}"`);
      const json = posts.post.filter(post => post['$'].file_url.includes('.jpeg') || post['$'].file_url.includes('.png') || post['$'].file_url.includes('.jpg') || post['$'].file_url.includes('.gif'));
      if (json.length === 0) return msg.reply(`🚫 No image/gif results for "${tags}"`);
      const post = json[Math.floor(Math.random() * json.length)]['$'];
      msg.channel.send({embed: {
        author: {
          name: `Rule34 "${tags}"`,
          icon_url: cfg.icon,
          url: `https://rule34.xxx/index.php?page=post&s=view&id=${post.id}`
        },
        color: cfg.color,
        image: {
          url: post.file_url
        }
      }});
    });
  });
};

exports.options = {
  aliases: ['r34'],
  format: '%prefix%r34 <tag>',
  description: 'Rule 34 search with tag'
};