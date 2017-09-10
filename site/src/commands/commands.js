const cfg = require('../../../config');
// const fs = require('fs');
// const path = require('path');
// const abbreviations = [
//   'csgo',
//   'coc',
//   'nsfw'
// ];
// const commands = {};
// for (const folder of fs.readdirSync('../bot/src/commands')) {
//   if (folder.endsWith('.js') || folder === 'owner') continue;
//   const name = abbreviations.includes(folder) ? folder.toUpperCase() : `${folder.charAt(0).toUpperCase()}${folder.slice(1)}`;
//   commands[name] = [];
//   for (const command of fs.readdirSync(`../bot/src/commands/${folder}`)) {
//     const info = require(`../../../bot/src/commands/${folder}/${command.replace(/\.js/, '')}`).options;
//     commands[name].push({
//       name: command.replace(/\.js/, ''),
//       description: info && info.description ? info.description : null,
//       aliases: info && info.aliases ? info.aliases : null
//     });
//   }
// }

module.exports = async (req, res) => {
  if (req.session.access_token) {
    const userData = await fetch('https://discordapp.com/api/v6/users/@me', {headers: {Authorization: `Bearer ${req.session.access_token}`}});
    const user = await userData.json();
    res.render('commands', {
      loggedIn: true,
      commands,
      user
    });
  } else {
    res.render('commands', {
      loggedIn: false,
      commands
    });
  }
};