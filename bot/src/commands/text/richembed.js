const {Discord, cfg} = require('../../../bot');
const colorMap = require('../../utils/colorMap.json');

exports.run = async (msg, args) => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  const channel = msg.channel;
  const embed = new Discord.RichEmbed();
  
  const titleMsg = await channel.send('**[Required]**\nWhat would you like the title of the embed to be?');
  const titleTxt = await channel.awaitMessages(m => m.author.equals(msg.author), {max: 1});
  embed.setTitle(titleTxt.first().content);
  await titleTxt.first().delete();
  await titleMsg.delete();
  
  const colorMsg = await channel.send('**[Optional]**\nWhat would you like the color of the embed to be?\nIt can be a hex color or word like **red, blue, yellow...** which you can find here <http://htmlcolorcodes.com>\nExample: #ffffff is white');
  const colorTxt = await channel.awaitMessages(m => m.author.equals(msg.author), {max: 1});
  if (/^(?:#|0x)(?:[A-F0-9]{3}|[A-F0-9]{6})$/gi.test(colorTxt.first().content)) {
    embed.setColor(colorTxt.first().content);
  } else if (colorTxt.first().content in colorMap) {
    embed.setColor(`#${colorMap[colorTxt.first().content.toLowerCase()]}`);
  }
  await colorTxt.first().delete();
  await colorMsg.delete();
  
  const textMsg = await channel.send('**[Required]**\nWhat would you like the text of the embed to be?\nNote: if you do [URL](https://example.com) it will convert to a hidden link');
  const textTxt = await channel.awaitMessages(m => m.author.equals(msg.author), {max: 1});
  embed.setDescription(textTxt.first().content.replace(/\\n/g, '\n'));
  await textTxt.first().delete();
  await textMsg.delete();
  
  msg.channel.send({embed});
};

exports.options = {
  aliases: ['richtext', 'rich'],
  description: 'Creates a RichEmbed'
};