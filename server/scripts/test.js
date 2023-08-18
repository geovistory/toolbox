require('./__dotenv');
const prompts = require('prompts');
const path = require('path');
const fs = require('fs');
const helpers = require('./__helpers');
const chooseGvAndWhDB = require('./__chooseGvAndWhDb');

process.env.LOGS = 'OFF';
process.env.NO_LOGS = 'true';

// assign defaults
process.env.DATABASE_URL = process.env.GV_DB_FOR_SEEDING;
let mochaGrep = process.env.MOCHA_GREP;
let mochaTimeout = process.env.MOCHA_TIMEOUT;
let mochaFolder = process.env.MOCHA_FOLDER || '**';

async function getUserInputs() {
  // confirm defaults
  const defaults = await confirmSettings();

  // validate defaults
  validateSettings();

  // finish here, if defaults confirmed
  if (defaults.confirmed) {
    return;
  }

  // let user customize settings
  console.log(`Defaults denyed. Customize settings:`);

  await chooseGvAndWhDB();

  const custom = await prompts([
    {
      type: 'select',
      message: 'What regex filter should be applied? (mocha --grep)',
      name: 'grep',
      choices: [
        {title: 'none (run all tests)', value: null},
        {title: 'custom', value: 'custom'},
        {
          title: mochaGrep + ' (env MOCHA_GREP)',
          value: mochaGrep,
        },
      ],
    },
    {
      type: prev => (prev === 'custom' ? 'text' : null),
      message: 'Custom mocha --grep:',
      name: 'customGrep',
    },
    {
      type: 'text',
      message: 'What folder filter should be applied? (mocha folder)',
      name: 'folder',
      initial: mochaFolder || '**',
    },
    {
      type: 'number',
      message: 'What timeout should be applied for tests? (mocha --timeout)',
      name: 'timeout',
      initial: mochaTimeout || 4000,
      description: 'mocha --timeout',
    },
  ]);

  // assign custom settings
  mochaGrep = custom.customGrep || custom.grep;
  mochaTimeout = custom.timeout;
  mochaFolder = custom.folder;

  // confirm custom settings
  const customConfirmation = await confirmSettings();
  if (!customConfirmation.confirmed) process.exit();

  // validate custom settings
  validateSettings();

  return;
}

async function confirmSettings() {
  return prompts({
    type: 'confirm',
    message: `Run tests with these settings?
    GV database:       ${helpers.createDbUrlPreview(
      process.env.DATABASE_URL,
    )} (from env.GV_DB_FOR_SEEDING)
    mocha-grep:     ${mochaGrep}
    mocha-folder:   ${mochaFolder}
    mocha-timeout:  ${mochaTimeout}
    `,
    name: 'confirmed',
  });
}

function validateSettings() {
  if (!process.env.DATABASE_URL) {
    console.log('No geovistory database url specified');
    process.exit();
  }
}

async function start() {
  await getUserInputs();
  const cmd = createCommand();
  console.log(`
  Running tests on geovistory db: ${helpers.createDbUrlPreview(
    process.env.DATABASE_URL,
  )} with this command:`);
  console.log(cmd);

  return require('./__execShell').fromScript(cmd);
}

start().catch(err => console.error(err));

const createCommand = () => {
  const mocha = path.join(__dirname, '../node_modules/.bin/mocha');
  const dist = path.join(__dirname, '../dist');
  const tests = path.join(__dirname, `../tests`);
  // Check if the tests directory exists
  if (!fs.existsSync(tests)) {
    // Create the directory
    fs.mkdirSync(tests);
    console.log(`Directory '${tests}' created successfully.`);
  }

  const report = path.join(tests, `mocha-test-${new Date().toISOString()}`);
  const cmd = `${mocha}\
  --trace-warnings\
  --timeout ${mochaTimeout}\
  --no-colors\
  --exit\
  ${mochaGrep ? `--grep "${mochaGrep}"` : ''}\
  '${dist}/__tests__/${mochaFolder}/*.js'\
  2>&1 | tee ${report}
  `;

  return cmd;
};

// function logPreview(resp) {
//   const cmd = createCommand(resp);
//   const dbUrlPreview = helpers.createDbUrlPreview(resp.selectedDbUrl);
//   console.log('\nConfirm your settings:');
//   console.log('Database: ', dbUrlPreview);
//   console.log('Folder: ', `'__tests__/${process.env.MOCHA_FOLDER}/*.js'`);
//   console.log('Command: ', cmd);
//   console.log('\n');
// }
