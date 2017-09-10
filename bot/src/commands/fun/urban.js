const {cfg} = require('../../../bot');
const fetch = require('node-fetch');

exports.run = (msg, args) => {
  const url = args[0] ? `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(args.join(' '))}` : 'https://api.urbandictionary.com/v0/random';
  fetch(url).then(async res => {
    const json = await res.json();
    if (json.result_type) {
      if (json.result_type === 'no_results') {
        msg.channel.send('🚫 No Results');
      } else {
        const term = json.list[0];
        msg.channel.send({embed: {
          author: {
            name: `Definition of "${term.word}"`,
            icon_url: cfg.icon,
            url: term.permalink
          },
          color: cfg.color,
          fields: [
            {
              name: `📖 Definition`,
              value: `${term.definition.substring(0, 1000)} ${term.definition.length > 1000 ? ' ...' : ''}`
            },
            {
              name: `📚 Example`,
              value: `${term.example.substring(0, 1000)} ${term.example.length > 1000 ? ' ...' : ''}`
            },
            {
              name: `🔖 Tag${json.tags.length === 1 ? '' : 's'}`,
              value: json.tags.length ? json.tags.sort().join(', ') : 'None'
            },
            {
              name: `👍 Likes`,
              value: term.thumbs_up,
              inline: true
            },
            {
              name: `👎 Dislikes`,
              value: term.thumbs_down,
              inline: true
            }
          ]
        }});
      }
    } else {
      const term = json.list[0];
      msg.channel.send({embed: {
        author: {
          name: `Definition of "${term.word}"`,
          icon_url: cfg.icon,
          url: term.permalink
        },
        color: cfg.color,
        fields: [
          {
            name: `📖 Definition`,
            value: `${term.definition.substring(0, 1000)} ${term.definition.length > 1000 ? ' ...' : ''}`
          },
          {
            name: `📚 Example`,
            value: `${term.example.substring(0, 1000)} ${term.example.length > 1000 ? ' ...' : ''}`
          },
          {
            name: `👍 Likes`,
            value: term.thumbs_up,
            inline: true
          },
          {
            name: `👎 Dislikes`,
            value: term.thumbs_down,
            inline: true
          }
        ]
      }});
    }
  });
};

exports.options = {
  aliases: ['ud'],
  format: '%prefix%urban <word>',
  description: 'Gets definition of a word on Urban Dictionary'
};