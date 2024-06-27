/**
 * This script loads the env vars from .env file
 *
 * Environment variables declared on the host machine
 * override the variables in the .env file!
 */
require('./__dotenv');
const prompts = require('prompts');

async function chooseDb() {
  const response = await prompts([
    {
      type: 'select',
      name: 'gvDbUrl',
      message: 'What database should be used as DATABASE_URL?',
      choices: [
        {title: 'GV_DB_DEV', value: process.env.GV_DB_DEV},
        {title: 'GV_DB_TEST', value: process.env.GV_DB_TEST},
        {title: 'GV_DB_REMOTE', value: process.env.GV_DB_REMOTE}
      ],
    }
  ]);

  if (!response.gvDbUrl) process.exit();
  process.env.DATABASE_URL = response.gvDbUrl;
}
module.exports = chooseDb;
