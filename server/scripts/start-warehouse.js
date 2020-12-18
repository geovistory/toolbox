require('./__dotenv');
const chooseDB = require('./__choosedb');
const prompts = require('prompts');
const warehouse = require('../dist/warehouse/startScripts');

async function chooseStartMode() {
  const response = await prompts({
    type: 'select',
    name: 'selectedStartFn',
    message: 'How should the warehouse be started?',
    choices: [
      {
        title: 'Start',
        description: `Starts the warehouse. If warehouse data is found,
        it will only index the changes that happened since last update.
        Else will (re-)create the full index.`,
        value: warehouse.startDev,
      },
      {
        title: 'Clean-and-start',
        description:
          'Cleans the warehouse data first, then starts the warehouse. This will (re-)create the full index.',
        value: warehouse.cleanAndStartDev,
      },
    ],
  });
  if (!response.selectedStartFn) process.exit();

  return response.selectedStartFn;
}

async function start() {
  await chooseDB();
  const startFn = await chooseStartMode();

  await startFn();
}

start().catch(err => {
  console.log(`***************************************`);
  console.error('Warehouse was up and running, when this error occured:');
  console.error(err);
  console.log(`***************************************`);
  process.exit(1);
});
