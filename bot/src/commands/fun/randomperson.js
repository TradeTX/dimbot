const {cfg} = require('../../../bot');
const fetch = require('node-fetch');
// https://stackoverflow.com/a/3291856
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.run = async (msg, args) => {
  const m = await msg.channel.send('Getting user...');
  fetch('https://randomuser.me/api')
    .then(async res => {
      const json = await res.json();
      const user = json.results[0];
      m.edit({embed: {
        author: {
          name: 'User Info',
          icon_url: cfg.icon,
          url: cfg.site
        },
        color: cfg.color,
        description: [
          `**Gender: **${user.gender.capitalize()}`,
          `**Title: **${user.name.title.capitalize()}`,
          `**Name: **${user.name.first.capitalize()} ${user.name.last.capitalize()}`,
          `**Email: **${user.email}`,
          `**Username: **${user.login.username}`,
          `**Password: **${user.login.password}`,
          `**Birthdate: **${user.dob}`,
          `**Phone: **${user.phone}`,
          `**Cell: **${user.cell}`,
          `**Picture: **<${user.picture.large}>`
        ].join('\n'),
        thumbnail: {
          url: user.picture.large
        }
      }});
    })
    .catch(err => {
      m.edit(`There was an error\n\`\`\`js\n${err}\`\`\`\nIf this error continues to occur, please contact <@${cfg.ownerID}>`);
    });
};

exports.options = {
  aliases: ['random-person', 'rp'],
  format: '%prefix%randomperson',
  description: 'Generates a random person'
};