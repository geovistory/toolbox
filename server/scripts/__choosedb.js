/**
 * This script loads the env vars from .env file
 *
 * Environment variables declared on the host machine
 * override the variables in the .env file!
 */
require('./__dotenv');
const prompts = require('prompts');

async function chooseDb() {
  const response = await prompts({
    type: 'select',
    name: 'selectedDbUrl',
    message: 'What database should be used as DATABASE_URL?',
    choices: [
      {title: 'DATABASE_URL', value: process.env.DATABASE_URL},
      {title: 'TEST_DATABASE_URL', value: process.env.TEST_DATABASE_URL},
      {
        title: 'TEMPLATE_DATABASE_URL',
        value: process.env.TEMPLATE_DATABASE_URL,
      },
    ],
  })

  if(!response.selectedDbUrl) process.exit()
  process.env.DATABASE_URL = response.selectedDbUrl;
}
module.exports = chooseDb;
