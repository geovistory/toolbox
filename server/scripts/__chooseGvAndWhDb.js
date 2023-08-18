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
        {title: 'GV_DB_REVIEW_COPY', value: process.env.GV_DB_REVIEW_COPY},
        {title: 'GV_DB_PROD_COPY', value: process.env.GV_DB_PROD_COPY},
        {title: 'GV_DB_FOR_SEEDING', value: process.env.GV_DB_FOR_SEEDING},
        {
          title: 'GV_DB_SCHEMA_TEMPLATE',
          value: process.env.GV_DB_SCHEMA_TEMPLATE,
        },
      ],
    },
  ]);

  if (!response.gvDbUrl) process.exit();
  process.env.DATABASE_URL = response.gvDbUrl;
}
module.exports = chooseDb;
