require('./__dotenv');
const chooseGvAndWhDB = require('./__chooseGvAndWhDb');
const prompts = require('prompts');

async function chooseStartMode() {
  const warehouse = require('../dist/warehouse/startScripts');
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
  await chooseGvAndWhDB();
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
