'use strict';

var util = module.exports = function() {}

/**
 * var getProtocol - get the protocol of api server ('http' or 'https').
 *
 * @return {String} protocol of api server
 */
util.getProtocol = function() {
  if (process.env.HEROKU_APP_NAME) {
    return 'https';
  }
  return undefined;
}

/**
 * exports.getHost - get the host of api server.
 *
 * @return {String} host of api server
 */
util.getHost = function() {
  if (process.env.HEROKU_APP_NAME) {
    return process.env.HEROKU_APP_NAME + '.herokuapp.com';
  }
  return undefined;
}

/**
 * exports.getPort - get the port of api server.
 *
 * @return {String}  port of api server
 */
util.getPort = function() {
  if (process.env.HEROKU_APP_NAME) {
    return '443';
  }
  return undefined;
}


/**
 * exports.getBaseUrl - get the base url of the api server.
 *
 * @return {String}  base url of api server (protocol + host + port)
 */
util.getBaseUrl = function() {
  return util.getProtocol() + util.getHost() + util.getPort();
}


