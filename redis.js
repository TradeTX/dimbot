const bluebird = require('bluebird');
const redis = require('redis');
const cfg = require('./config.js');
const log = console.log;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient({
  host: cfg.redis_host,
  password: cfg.redis_password
});

client.on('ready', () => log('Redis is ready to be used'));
client.on('connect', () => log('Connected to Redis'));
client.on('end', () => log('\n\x1b[1mRedis DB Ended\x1b[0m'));
client.on('reconnecting', connection => {
  log([
    '\n\x1b[4mReconnecting to Redis DB\x1b[0m',
    `\x1b[31mAttempt: #${connection.attempt}`,
    `Delay: ${connection.delay}\x1b[0m`
  ].join('\n '));
});
client.on('error', error => {
  log([
    '\n\x1b[4mRedis DB Error\x1b[0m',
    `\x1b[31mCode: ${error.code}`,
    `Error: ${error.errno}`,
    `Call: ${error.syscall}`,
    `Address: ${error.address}`,
    `Port: ${error.port}\x1b[0m`
  ].join('\n '));
});

module.exports = client;