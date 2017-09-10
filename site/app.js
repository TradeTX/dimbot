const session = require('client-sessions');
const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
const path = require('path');
const port = process.env.PORT || 1402;
const app = express();
const cfg = require('../config');


// const fs = require('fs');
// const abbreviations = ['csgo', 'coc', 'nsfw'];
// const commands = {};
// console.log(fs.readdirSync('../bot/src/commands'))
// for (const folder of fs.readdirSync('../bot/src/commands')) {
//   if (folder.endsWith('.js') || folder === 'owner') continue;
//   const name = abbreviations.includes(folder) ? folder.toUpperCase() : `${folder.charAt(0).toUpperCase()}${folder.slice(1)}`;
//   commands[name] = [];
//   for (const command of fs.readdirSync(`../bot/src/commands/${folder}`)) {
//     const info = require(`../bot/src/commands/${folder}/${command}`).options;
//     console.log(info);
//     commands[name].push({
//       name: command.replace(/\.js/, ''),
//       description: info && info.description ? info.description : null,
//       aliases: info && info.aliases ? info.aliases : null
//     });
//   }
// }

app.use(morgan('dev'), session({
  cookieName: 'session',
  secret: cfg.site_secret,
  duration: 604800000,
  activeDuration: 604800000
}));

app.set('view engine', 'ejs');

// Misc
app.get('/', require('./src/home'));

// Commands
// app.get('/commands', require('./src/commands/commands'));
// app.get('/commands/:group', require('./src/commands/group'));
// app.get('/commands/:group/:name', require('./src/commands/command'));

// Discord
app.get('/add', require('./src/discord/add'));
app.get('/authorize', require('./src/discord/authorize'));
app.get('/discord', require('./src/discord/discord'));
app.get('/login', require('./src/discord/login'));
app.get('/logout', require('./src/discord/logout'));

// Management
app.get('/dashboard/:id', require('./src/dashboard/dashboard'));
app.get('/dashboard/:id/:type', require('./src/dashboard/dashboard'));
app.get('/servers', require('./src/dashboard/servers'));

// Utils
app.get('/youtube-mp3', require('./src/utils/youtube-mp3'));
app.get('/youtube-mp4', require('./src/utils/youtube-mp4'));

app.use('/static', express.static('./static'));

app.use((req, res) => res.redirect('/'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});