const redis = require("redis");
const util = require('util');
/**
 * grap asyn handlers to use the latest request prevent block the Event Loop
 * usit if you need to set get or update something in async way and non blocking for other process
 * @return {object} all setters and update expires
 */
const promisify = util.promisify
const client= redis.createClient();
/**
 * @type {Promise} getAsync return get
 * @type {Promise} setAsync return set client
 */
const getAsync    = promisify(client.get).bind(client);
const setAsync    = promisify(client.set).bind(client);
const existAsync  = promisify(client.exists).bind(client);
const expireAsync = promisify(client.expireat).bind(client);

const setKey = (param, val) => {
  return setAsync(param, val);
} 
const getKey = (param) => {
  return getAsync(param);
}
const existsKey = (param) => {
  return existAsync(existAsync)
}

const expireKey = (param, time) => {
  console.log(param, ' to expire')
  return expireAsync(param, time)
}

module.exports = {
  setKey,
  getKey,
  existsKey,
  expireKey,
}

