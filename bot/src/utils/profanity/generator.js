const fs = require('fs');
const output = './profanity.json';
const words = [];

for (const file of fs.readdirSync('./words')) {
  const content = fs.readFileSync(`./words/${file}`, 'utf8').replace(/\r/g, '');
  for (const word of content.split('\n')) {
    if (words.includes(word)) continue;
    if (!word) continue;
    words.push(word);
  }
}

fs.writeFileSync(output, JSON.stringify(words), 'utf8');