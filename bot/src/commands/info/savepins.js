const haste = require('hastebin-generator');
const fs = require('fs');
const moment = require('moment');
const { Buffer } = require('buffer');

exports.run = msg => {
  if (msg.channel.type !== 'text') return msg.channel.send('This command only works in text channels');
  msg.channel.send('Getting all pinned messages').then(m => {
    msg.channel.fetchPinnedMessages().then(pinned => {
      if (!pinned.first()) return m.edit('This channel has no pinned messages');
      m.edit('Uploading pinned messages').then(() => {
        const pins = [];
        const pin = pinned.array();
        for (const i in pin) {
          pins.push(`${pin[i].author.tag} on ${moment(pin[i].timestamp).format('MMMM Do YYYY [at] h:mm:ss a')}${pin[i].member.nickname ? `(aka ${pin[i].member.nickname})` : ''}\n${pin[i].content}`);
          if (pin[i].attachments.first()) {
            pins[i] +='\nAttachments';
            for (const file of pin[i].attachments.array()) {
              pins[i] += `\n${file.url}`;
            }
          }
        }
        const text = pins.join('\n\n___________________\n\n');
        const file = Buffer.from(text, 'utf8');
        msg.channel.send({file: {attachment: file, name: 'pins.txt'}});
        haste(text, 'txt').then(url => {
          m.edit(url.replace(/com\//, 'com/raw/'));
        });
      });
    });
  });
};

exports.options = {
  aliases: ['pins', 'exportpins', 'getpins'],
  format: '%prefix%pins',
  description: 'Saves all pins in current channel'
};