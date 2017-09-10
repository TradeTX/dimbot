const generate = require('../../utils/jadenSmithTweetGenerator');
const { cfg } = require('../../../bot')

exports.run = msg => {
  msg.channel.send({embed: {
    author: {
      name: `Jaden Smith`,
      icon_url: 'https://www.famousbirthdays.com/headshots/jaden-smith-1.jpg',
      url: 'https://twitter.com/officialjaden'
    },
    color: cfg.color,
    description: generate()
  }});
};

exports.options = {
  aliases: ['js'],
  description: 'Jaden Smith Tweet Generator'
};