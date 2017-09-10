const {cfg} = require('../../../bot');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}lyrics {title}`);
  msg.channel.send('Fetching songs...').then(m => {
    const title = args.join(' ');
    fetch(`https://api.genius.com/search?q=${encodeURIComponent(title)}`, {headers:{Authorization:`Bearer ${cfg.api.genius_token}`}})
      .then(async res => {
        const json = await res.json();
        const songs = json.response.hits.slice(0, 5);
        if (!songs) return m.edit('No results found, try searching something else');
        let sgs = [];
        let text = '';
        let emojis;
        for (const song of songs) {
          sgs.push({
            songName: song.result.full_title,
            songURL: `https://genius.com${song.result.path}`,
            artistName: song.result.primary_artist.name,
            artistURL: song.result.primary_artist.url,
            api: song.result.api_path
          });
        }
        for (let i in sgs) {
          text += `**${parseInt(i) + 1})** [${sgs[i].songName}](${sgs[i].songURL}) | [${sgs[i].artistName}](${sgs[i].artistURL})\n`;
        }
        m.edit({embed: {
          author: {
            name: 'Commands',
            icon_url: cfg.icon,
            url: cfg.site
          },
          color: cfg.color,
          description: text,
          thumbnail: {
            url: songs[0].result.song_art_image_thumbnail_url
          }
        }});
        switch (songs.length) {
          case 1:
            emojis = ['1⃣'];
            break;
          case 2:
            emojis = ['1⃣','2⃣'];
            break;
          case 3:
            emojis = ['1⃣','2⃣','3⃣'];
            break;
          case 4:
            emojis = ['1⃣','2⃣','3⃣','4⃣'];
            break;
          default:
            emojis = ['1⃣','2⃣','3⃣','4⃣','5⃣'];
        }
        m.awaitReactions(
          (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === msg.author.id,
          {max: 1, time: 30000}
        )
        .then(reactions => {
          const emojimap = {
            '1⃣': 0,
            '2⃣': 1,
            '3⃣': 2,
            '4⃣': 3,
            '5⃣': 4
          };
          fetch(sgs[emojimap[reactions.first().emoji.name]].songURL).then(async res => {
            const html = await res.text();
            const $ = cheerio.load(html);
            const raw = $('.lyrics').text();
            const lyrics = raw.replace(/^\s+/g, '').replace(/(^\[.*\])/gm, '**$1**');
            m.delete();
            if (msg.channel.type !== 'text') return msg.channel.send(lyrics, {split: true});
            msg.member.createDM().then(dm => {
              dm.send(lyrics, {split: true})
                .then(() => msg.reply('I sent you a DM 📫'))
                .catch(() => msg.reply('I can\'t DM you 📪'));
            }).catch(() => msg.reply('I can\'t DM you 📪'));
          });
        })
        .catch(() => {
          m.delete().then(() => {
            msg.channel.send('30 seconds to pick is up!').then(m => {
              setTimeout(() => {
                m.delete();
              }, 2500);
            });
          });
        });
        for (const emoji of emojis) {
          await m.react(emoji).catch(console.log);
        }
      });
  });
};

exports.options = {
  aliases: ['genius'],
  format: '%prefix%lyrics {title}',
  description: 'Gets lyrics of a song using genius.com'
};