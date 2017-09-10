const fetch = require('node-fetch');
const {cfg} = require('../../bot');

module.exports = input => {
  return new Promise(async (resolve, reject) => {
    try {
      let id;
      if (input.includes('profiles/')) {
        id = input.split('profiles/')[1].split('/')[0].split('?')[0];
      } else if (input.includes('id/')) {
        const name = input.split('id/')[1].split('/')[0].split('?')[0];
        const data = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${cfg.api.steam_token}&vanityurl=${name}`);
        const json = await data.json();
        if (json.response.success === 1) id = json.response.steamid;
      } else if (/\d{17}/.test(input)) {
        id = input;
      } else {
        const data = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${cfg.api.steam_token}&vanityurl=${input}`);
        const json = await data.json();
        if (json.response.success === 1) id = json.response.steamid;
      }
      resolve(id);
    } catch (err) {
      reject(err);
    }
  });
};