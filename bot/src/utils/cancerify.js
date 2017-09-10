const cancerify = char => {
  return Math.round(Math.random()) <= 0.5
    ? char.toLowerCase()
    : char.toUpperCase();
};

module.exports = text => text.split('').map(cancerify).join('');