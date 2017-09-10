const {cfg} = require('../../../bot');
const fetch = require('node-fetch');

exports.run = async (msg, args) => {
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}github-user {name}`);
  const m = await msg.channel.send('Getting user...');
  const info = args.join(' ');
  let name;
  if (/^https?:\/\/github\.com\/.*$/gi.test(info)) {
    name = info.replace(/^https?:\/\/github\.com\/(.*)\/.*$/gi, '$1');
  } else {
    name = info;
  }
  fetch(`https://api.github.com/users/${encodeURIComponent(name)}`, {headers:{Authorization:`Bearer ${cfg.api.github_token}`}})
    .then(async res => {
      const json = await res.json();
      if (json.message === 'Not Found') return msg.reply(`couldn't find github.com/${name}`);
      m.edit({embed: {
        author: {
          name: 'User Info',
          icon_url: cfg.icon,
          url: cfg.site
        },
        color: cfg.color,
        fields: [
          {
            name: '👤 Username',
            value: `[${json.login}](${json.html_url})`,
            inline: true
          },
          {
            name: '👥 Nickname',
            value: json.name || '🚫 None',
            inline: true
          },
          {
            name: '📝 Bio',
            value: json.bio || '🚫 None',
            inline: true
          },
          {
            name: '🌐 Homepage',
            value: json.blog || '🚫 None',
            inline: true
          },
          {
            name: '🖊 Public Repos',
            value: json.public_repos || '🚫 None',
            inline: true
          },
          {
            name: '🖋 Public Gists',
            value: json.public_gists || '🚫 None',
            inline: true
          }
        ],
        thumbnail: {
          url: json.avatar_url
        }
      }});
    })
    .catch(err => {
      m.edit(`There was an error\n\`\`\`js\n${err}\`\`\`\nIf this error continues to occur, please contact <@${cfg.ownerID}>`);
    });
};

exports.options = {
  aliases: ['gh'],
  format: '%prefix%github {username/link}',
  description: 'Gets GitHub user info'
};