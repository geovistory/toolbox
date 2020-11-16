require('./__dotenv');
const chooseDB = require('./__choosedb');
const prompts = require('prompts');

async function getUserInputs() {
  const featureX = require('../dist/__tests__/helpers/graphs/feature-X.helper');
  const cleanDb = require('../dist/__tests__/helpers/cleaning/clean-db.helper');
  const response = await prompts([
    {
      type: 'select',
      name: 'seedFunction',
      message: 'How should the database be seeded?',
      choices: [
        {
          title: 'Mockdata forFeatureX',
          description: `Fills the database with mock data. Few data, fast.`,
          value: featureX.forFeatureX,
        }
      ],
    },
    {
      type: 'select',
      name: 'cleanFunction',
      message: 'Would you like to clean the database first?',
      choices: [
        {
          title: 'Yes',
          value: cleanDb.cleanDb,
        },
        {
          title: 'No',
          value: null,
        },
      ],
    },
    {
      type: prev => (!prev ? null : 'confirm'),
      name: 'confirm',
      message: (prev, values) => `Start seeding?`,
    },
  ]);

  if (!response.confirm) process.exit();

  return response;
}

async function start() {
  await chooseDB();
  const resp = await getUserInputs();
  if (resp.cleanFunction) await resp.cleanFunction();
  await resp.seedFunction();
}

start()
  .then(_ => console.log('Successfully seeded database!'))
  .catch(err => console.error(err));
