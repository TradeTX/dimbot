const weapons = [
  'a Nova',
  'an XM1014',
  'a Sawed-Off/MAG-7',
  'an M249',
  'a Negev',
  'an MP9/MAC-10',
  'an MP7',
  'an UMP-45',
  'a P90',
  'a PP-Bizon',
  'a Galil AR/FAMAS',
  'an AK-47/M4A4/M4A1-S',
  'an SSG 08',
  'an AUG/SG 553',
  'an AWP'
];

exports.run = async msg => {
  msg.channel.send(`You should use ${weapons[Math.floor(Math.random() * weapons.length)]}`);
};

exports.options = {
  aliases: [],
  format: '%prefix%csgoprimary',
  description: 'Picks random primary weapon'
};