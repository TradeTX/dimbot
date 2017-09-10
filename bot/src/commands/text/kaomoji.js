const kaomojis = require('../../utils/kaomoji.json');

exports.run = (msg, args) => {
  msg.channel.send(kaomojis[Math.floor(Math.random() * kaomojis.length)]);
};

exports.options = {
  aliases: ['emoticon', 'weeb']
};