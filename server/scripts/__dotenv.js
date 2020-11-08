/**
 * This script loads the env vars from .env file
 *
 * Environment variables declared on the host machine
 * override the variables in the .env file!
 */
const dotenv = require('dotenv');
const path = require('path');

const result = dotenv.config({path: path.join(__dirname, '../.env')});
if (result.error) {
  throw result.error;
}
const {parsed: envs} = result;
// console.log(envs);
module.exports = envs;
