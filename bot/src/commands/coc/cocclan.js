const { cfg } = require('../../../bot');
const fetch = require('node-fetch');

exports.run = (msg, args) => {
  return msg.reply('command not done yet');
  const tag = args.join(' ').replace(/^#/, '');
  fetch(`https://api.clashofclans.com/v1/players/%23${tag}`, {headers:{Authorization:`Bearer ${cfg.api.coc_token}`}}).then(async res => {
    const json = await res.json();
    if (json.reason) return console.log(`${json.reason}\n${json.message}`);
    msg.channel.send({embed: {
      author: {
        name: `${json.name}'s info`,
        icon_url: cfg.icon,
        url: cfg.site
      },
      color: cfg.color,
      fields: [
        {
          name: '👤 Player',
          value: `Name: ${json.name}\nLevel: ${json.expLevel}\nTag: ${json.tag}`,
          inline: true
        },
        {
          name: '🔰 Clan',
          value: `Name: ${json.clan.name}\nLevel: ${json.clan.clanLevel}\nTag: ${json.clan.tag}`,
          inline: true
        },
        {
          name: '\u200B',
          value: '\u200B'
        },
        {
          name: '🏠 Home Village',
          value: `Trophies: ${json.trophies}\nLevel: ${json.townHallLevel}`,
          inline: true
        },
        {
          name: '🏚 Builder Hall',
          value: `Trophies: ${json.versusTrophies}\nLevel: ${json.builderHallLevel}`,
          inline: true
        }
      ]
    }});
  });
};

exports.options = {
  format: '%prefix%cocclan {tag}',
  description: 'Clash Of Clans clan info'
};