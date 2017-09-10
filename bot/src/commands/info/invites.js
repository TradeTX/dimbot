const moment = require('moment');
const {cfg} = require('../../../bot');

exports.run = async msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  const invites = await msg.guild.fetchInvites();
  if (!invites.size) return msg.channel.send(`**${msg.guild.name}** has no invites`).catch(console.log);
  const inviteMap = [];
  invites.forEach(invite => {
    inviteMap.push({
      url: invite.url,
      expires: invite.expiresTimestamp,
      temporary: invite.maxAge,
      inviter: invite.inviter,
      uses: invite.uses
    });
  });
  inviteMap.splice(5);
  let toSend = '———————————————————\n';
  for (const invite of inviteMap) {
    toSend += `**URL: **<${invite.url}>\n**Expires: **${invite.temporary ? moment(invite.expires).format('MMMM Do YYYY [at] h:mm:ss a') : 'Never'}\n**By: **${invite.inviter || 'Widget'}\n**Uses: **${invite.uses}\n———————————————————\n`;
  }
  msg.channel.send({embed: {
    author: {
      name: `Listing ${inviteMap.length} invite${inviteMap.length === 1 ? '' : 's'} from ${msg.guild.name}`,
      icon_url: msg.guild.iconURL || cfg.icon,
      url: cfg.site
    },
    color: cfg.color,
    description: toSend
  }});
};

exports.options = {
  format: '%prefix%invites',
  description: 'Gets 5 invites in current guild'
};