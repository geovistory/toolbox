require('./__dotenv');
const prompts = require('prompts');
const path = require('path');
const helpers = require('./__helpers');

process.env.LOGS = 'OFF';
process.env.NO_LOGS = 'true';

async function chooseDb() {
  const response = await prompts([
    {
      type: 'select',
      name: 'selectedDbUrl',
      message: 'What database should be used as DATABASE_URL?',
      choices: [
        {title: 'TEST_DATABASE_URL', value: process.env.TEST_DATABASE_URL},
        {title: 'DATABASE_URL', value: process.env.DATABASE_URL},
        {
          title: 'TEMPLATE_DATABASE_URL',
          value: process.env.TEMPLATE_DATABASE_URL,
        },
      ],
    },
    {
      type: 'number',
      message: 'Mocha --timeout:',
      name: 'timeout',
      initial: 4000,
      description: 'mocha --timeout',
    },
    {
      type: 'select',
      message: 'Mocha --grep:',
      name: 'grep',
      choices: [
        {title: 'env.MOCHA_GREP', value: process.env.MOCHA_GREP},
        {title: 'none', value: null},
        {title: 'custom', value: 'custom'},
      ],
    },
    {
      type: prev => (prev === 'custom' ? 'text' : null),
      message: 'Custom mocha --grep:',
      name: 'customGrep',
    },
    {
      type: 'confirm',
      message: 'Run tests? (will delete data from specified db)',
      description: (prev, values) => `${logPreview(values)}`,
      name: 'confirm',
    },
  ]);
  if (!response.selectedDbUrl) {
    console.log('No database url specified');
    process.exit();
  }
  if (!response.confirm) process.exit();
  process.env.DATABASE_URL = response.selectedDbUrl;

  return response;
}

async function start() {
  const resp = await chooseDb();
  const cmd = createCommand(resp);

  return require('./__execShell').fromScript(cmd);
}

start().catch(err => console.error(err));

function createCommand(resp) {
  const mocha = path.join(__dirname, '../node_modules/.bin/mocha');
  const dist = path.join(__dirname, '../dist');
  const g = resp.cusomGrep || resp.grep;
  const grep = g ? `--grep "${g}"` : '';
  const cmd = `${mocha}\
  --timeout ${resp.timeout}\
  --colors\
  ${grep}\
  '${dist}/__tests__/**/*.js'`;
  return cmd;
}

function logPreview(resp) {
  const cmd = createCommand(resp);
  const dbUrlPreview = helpers.createDbUrlPreview(resp.selectedDbUrl);
  console.log('\nConfirm your settings:');
  console.log('Database: ', dbUrlPreview);
  console.log('Command: ', cmd);
  console.log('\n');
}
