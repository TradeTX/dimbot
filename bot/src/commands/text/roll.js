const {cfg} = require('../../../bot');

exports.run = (msg, args) => {
  if (args.join(' ').match(/\d+ \d+$/g)) {
    const min = args[0];
    const max = args[1];
    msg.channel.send(`Random number between ${min} and ${max}\nResult: ${Math.floor(Math.random() * (max - min + 1) + min)}`);
  } else {
    msg.channel.send(`${cfg.prefix}roll {A} {B}`)
  }
};

exports.options = {
  aliases: [],
  format: '%prefix%roll {a} {b}',
  description: 'Chooses a random number between {a} and {b}'
};