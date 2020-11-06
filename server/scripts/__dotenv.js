/**
 * This script loads the env vars from .env file
 *
 * Environment variables declared on the host machine
 * override the variables in the .env file!
 */
const dotenv = require('dotenv');
const result = dotenv.config({path: '../.env'});
if (result.error) {
  throw result.error;
}
const {parsed: envs} = result;
// console.log(envs);
module.exports = envs;
