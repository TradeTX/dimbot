const {cfg, bot} = require('../../../bot');

exports.run = async (msg, args) => {
  let user = msg.mentions.users.first() || msg.author;
  let names = [];
  const m = await msg.channel.send('Doing things...');
  for (const [i, guild] of bot.guilds) {
    if (names.length >= 10) break;
    await guild.fetchMembers();
    for (const [e, member] of guild.members) {
      if (names.length >= 10) break;
      if (member.user.discriminator === user.discriminator && member.user.username !== user.username && !names.includes(member.user.tag)) {
        names.push(member.user.tag);
      }
    }
  }
  m.edit({embed: {
    author: {
      name: 'Done doing things',
      icon_url: cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    description: names.length ? names.join(' | ') : `Sorry, but I find discriminators by searching for every user in every guild I'm in, and out of the ${bot.guilds.size} guilds I'm in, none of them contained a user with the same discriminator as ${user}`
  }});
}

exports.options = {
  aliases: ['discrim'],
  format: '%prefix%discriminator {@user}',
  description: 'Finds a matching discriminator'
};