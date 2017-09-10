const { cfg } = require('../../../bot');
const steamid = require('../../utils/steamid');
const fetch = require('node-fetch');

const name = (array, name) => array.filter(obj => obj.name === name)[0].value;

exports.run = async (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}csgo {profile_url}`);
  console.time();
  const arg = args.join(' ');
  const id = await steamid(arg);
  if (!id) return msg.reply(' I couldn\'t find that profile');
  const m = await msg.channel.send('Fetching info...');
  Promise.all([
    fetch(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002?appid=730&key=${cfg.api.steam_token}&steamid=${id}`),
    fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?key=${cfg.api.steam_token}&steamids=${id}`),
    fetch(`http://csgobackpack.net/api/GetInventoryValue?id=${id}`)
  ]).then(async vals => {
    for (val of vals) if (!val.ok) return msg.reply('Error fetching info');
    const csgoJSON = await vals[0].json();
    const stats = csgoJSON.playerstats.stats;
    const playerJSON = await vals[1].json();
    const player = playerJSON.response.players[0];
    const backpack = await vals[2].json();
    const played = Math.floor(name(stats, 'total_time_played') / 360) / 10;
    m.edit({embed: {
      author: {
        name: `${player.personaname}'s info`,
        icon_url: player.avatar,
        url: player.profileurl
      },
      color: cfg.color,
      fields: [
        {
          name: '🎯 Accuracy',
          value: `${Math.floor((name(stats, 'total_shots_fired') / name(stats, 'total_shots_hit')) * 100) / 100}%`,
          inline: true
        },
        {
          name: '🏆 Achievements',
          value: `${csgoJSON.playerstats.achievements.length} / 167`,
          inline: true
        },
        {
          name: '🕒 Played',
          value: `${played} Hour${played === 1 ? '' : 's'}`,
          inline: true
        },
        {
          name: '🔫 Kills',
          value: name(stats, 'total_kills'),
          inline: true
        },
        {
          name: '💀 Deaths',
          value: name(stats, 'total_deaths'),
          inline: true
        },
        {
          name: '💵 Inventory',
          value: `$${backpack.value}`,
          inline: true
        }
      ]
    }});
  }).catch(err => {
    console.log(err);
    m.edit('Error fetching info');
  });
};

exports.options = {
  aliases: ['csgo'],
  format: '%prefix%csgoprofile {profile_url}',
  description: 'CSGO profile info'
};