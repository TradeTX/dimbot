const weapons = [
  'a Glock-18/P2000/USP-S',
  'Dual Berettas',
  'a P250',
  'a Five-Seven/Tec-9',
  'a Desert Eagle/R8 Revolver'
];

exports.run = async msg => {
  msg.channel.send(`You should use ${weapons[Math.floor(Math.random() * weapons.length)]}`);
};

exports.options = {
  aliases: [],
  format: '%prefix%csgosecondary',
  description: 'Picks random secondary weapon'
};