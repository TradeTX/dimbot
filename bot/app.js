const { ShardingManager } = require('discord.js');
const { token } = require('../config');
const Manager = new ShardingManager('./bot.js', { token });
Manager.spawn();