const clean = require('../../utils/clean');
const haste = require('hastebin-generator');
const {inspect} = require('util');
const {Discord, cfg, bot, redis} = require('../../../bot');

exports.run = async (msg, args) => {
  if (msg.author.id !== cfg.ownerID) return msg.reply(`only <@${cfg.ownerID}> can use this command`);
  const code = clean(args.join(' '));
  const start = process.hrtime();
  try {
    let evaled = await clean(eval(code));
    if (typeof evaled !== 'string') evaled = inspect(evaled, {depth: 1});
    const link = evaled.length > 1600 ? `Full: ${await haste(evaled, 'js')}` : '';
    msg.channel.send([
      `📥 **INPUT**`,
      '```js',
      `${code.substring(0, 300) || 'undefined'}${code.length > 300 ? `... (${code.length - 300} more characters)` : ''}`,
      '```',
      `📤 **OUTPUT** ${process.hrtime(start).join('.')}ms`,
      '```js',
      `${evaled.substring(0, 1600) || 'undefined'}${evaled.length > 1600 ? `... (${evaled.length - 1600} more characters)` : ''}`,
      '```',
      link
    ]);
  } catch (err) {
    msg.channel.send([
      `📥 **INPUT**`,
      '```js',
      `${code.substring(0, 300) || 'undefined'}${code.length > 300 ? `... (${code.length - 300} more characters)` : ''}`,
      '```',
      `📤 **OUTPUT** ${process.hrtime(start).join('.')}ms`,
      '```js',
      clean(err) || 'undefined',
      '```'
    ]);
  }
};