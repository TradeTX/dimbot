const {cfg} = require('../../bot');
const fs = require('fs');
const abbreviations = [
  'csgo',
  'coc',
  'nsfw'
];

exports.run = msg => {
  const commands = {};
  for (const folder of fs.readdirSync('./src/commands/')) {
    if (/\.js$/.test(folder) || folder === 'owner') continue;
    commands[folder] = [];
    for (const file of fs.readdirSync(`./src/commands/${folder}`).sort()) {
      commands[folder].push(file);
    }
  }
  let text = '<> = optional\n{} = required\n—————————————\n';
  for (const folder in commands) {
    text += `${abbreviations.includes(folder) ? folder.toUpperCase() : folder.charAt(0).toUpperCase() + folder.slice(1)}\n`;
    for (const file of commands[folder]) {
      const req = require(`./${folder}/${file}`);
      text += `  ${req.options && req.options.format ? req.options.format.replace(/%prefix%/gi, cfg.prefix) : cfg.prefix + file.replace(/(.*)\.js/g, '$1')} ${req.options && req.options.description ? `- ${req.options.description}` : ''}\n`;
    }
  }
  if (msg.channel.type !== 'text') return msg.channel.send(text, {code: true, split: true});
  msg.member.createDM().then(dm => {
    dm.send(text, {code: true, split: true})
      .then(() => msg.reply('I sent you a DM 📫'))
      .catch(() => msg.reply('I can\'t DM you 📪'));
  }).catch(() => msg.reply('I can\'t DM you 📪'));
};

exports.options = {
  aliases: ['commands', 'helpme']
};