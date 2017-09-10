const {glob, cfg} = require('../../../bot');
const dir = cfg.dir ? cfg.dir.replace(/\/$/, '') : './src';

exports.run = (msg, args) => {
  if (msg.author.id !== cfg.ownerID) return msg.reply(`only <@${cfg.ownerID}> can use this command`);
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}reload {commands}`);
  const commands = {};
  const commandFiles = glob.sync(`${dir}/commands/**/*.js`);
  for (const file of commandFiles) {
    const name = file.replace(/.*\/(.*)\.js/g, '$1');
    commands[name] = file;
    const req = require(file).options;
    if (!req) return console.log(`Options not defined for ${file}`);
    for (const alias of req.aliases) {
      commands[alias] = file;
    }
  }
  const reloaded = [];
  for (const command of args) {
    delete require.cache[require.resolve(`../../${commands[args[0]]}`)];
    reloaded.push(command);
  }
  msg.channel.send(`The command${args.length > 1 ? 's' : ''} "${args.join(', ')}" has been reloaded`);
};

exports.options = {
  aliases: ['refresh']
};