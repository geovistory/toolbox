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
      {title: 'DB_REVIEW_COPY', value: process.env.DB_REVIEW_COPY},
      {title: 'DB_PROD_COPY', value: process.env.DB_PROD_COPY},
      {title: 'DB_FOR_SEEDING', value: process.env.DB_FOR_SEEDING},
      {
        title: 'DB_SCHEMA_TEMPLATE',
        value: process.env.DB_SCHEMA_TEMPLATE,
      },
    ],
  })

  if(!response.selectedDbUrl) process.exit()
  process.env.DATABASE_URL = response.selectedDbUrl;
}
module.exports = chooseDb;
