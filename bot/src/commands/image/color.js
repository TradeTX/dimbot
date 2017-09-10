const {cfg} = require('../../../bot');
const colorMap = require('../../utils/colorMap.json');
const Canvas = require('canvas');
const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');

const hexRegex = /^#[A-F0-9]{6}$|^#[A-F0-9]{3}$/gi;
const rgbRegex = /^(?:rgb)?\(?\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*\)?$/gi;

const invertColor = color => {
  color = color.substring(1);           // remove #
  color = parseInt(color, 16);          // convert to integer
  color = 0xFFFFFF ^ color;             // invert three bytes
  color = color.toString(16);           // convert to hex
  color = ('000000' + color).slice(-6); // pad with leading zeros
  color = '#' + color;                  // prepend #
  return color;                         // https://stackoverflow.com/a/9601429
};

exports.run = async (msg, args) => {
  let color = args.join(' ').trim();
  let hex, rgb;
  if (/^#\w{3}$/.test(color)) color = color.replace(/(\w{3})/, '$1$1');
  if (hexRegex.test(color)) {
    hex = color;
    rgb = hexRgb(hex);
  } else if (rgbRegex.test(color)) {
    rgb = color;
    hex = `#${rgbHex(rgb)}`;
  } else if (color.toLowerCase() in colorMap) {
    hex = `#${colorMap[color]}`;
    rgb = hexRgb(hex);
  } else {
    hex = color;
    rgb = hexRgb(hex);
  }
  msg.channel.startTyping();
  const cvs = new Canvas(200, 200);
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = invertColor(hex);
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Hex: ${hex.toUpperCase()}`, cvs.width / 2, cvs.height / 2 - 15);
  ctx.fillText(`RGB: ${rgb}`, cvs.width / 2, cvs.height / 2 + 15);
  await msg.channel.send({file: {
    name: 'color.png',
    attachment: cvs.toBuffer()
  }});
  msg.channel.stopTyping();
};

exports.options = {
  aliases: ['colour'],
  format: '%prefix%color {color}',
  description: 'Preview and convert hex/rgb colors'
};