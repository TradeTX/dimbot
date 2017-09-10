const {cfg} = require('../../../bot');
const fetch = require('node-fetch');

exports.run = (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}youtube {title/url}`);
  const title = args.join(' ');
  msg.channel.send('Loading results...').then(m => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${cfg.api.youtube_token}&q=${encodeURI(title)}&part=snippet&maxresults=5`)
      .then(async res => {
        const json = await res.json();
        const videos = json.items;
        let vids = [];
        let text = '';
        for (const video of videos) {
          vids.push({
            'vidName': video.snippet.title,
            'vidURL': `https://www.youtube.com/watch?v=${video.id.videoId}`,
            'channelName': video.snippet.channelTitle,
            'channelURL': `https://www.youtube.com/channel/${video.snippet.channelId}`
          });
        }
        for (let i in vids) {
          text += `**${parseInt(i) + 1})** [${vids[i].vidName}](${vids[i].vidURL}) | [${vids[i].channelName}](${vids[i].channelURL})\n`;
        }
        m.edit({embed: {
          author: {
            name: 'Loaded Results',
            icon_url: cfg.icon,
            url: cfg.site
          },
          color: cfg.color,
          description: text
        }});
      })
      .catch(err => {
        m.edit(`There was an error\n\`\`\`js\n${err}\`\`\`\nIf this error continues to occur, please contact <@${cfg.ownerID}>`);
      });
  });
};

exports.options = {
  aliases: ['video', 'search'],
  format: '%prefix%search {title}',
  description: 'Searches title on YouTube'
};
