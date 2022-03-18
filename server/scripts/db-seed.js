require('./__dotenv');
const chooseDB = require('./__chooseGvDb');
const prompts = require('prompts');

async function getUserInputs() {
  const minimumForDev = require('../dist/__tests__/helpers/graphs/minimum-for-dev.helper');
  const featureX = require('../dist/__tests__/helpers/graphs/feature-X.helper');
  const factoids = require('../dist/__tests__/helpers/graphs/heavy-factoids.helper');
  const forFullText = require('../dist/__tests__/helpers/graphs/entity-fulltext.helper');
  const digitals = require('../dist/__tests__/helpers/graphs/digitals.helper');
  const sysConfig = require('../dist/__tests__/helpers/graphs/sys-config-valid.helper');
  const cleanDb = require('../dist/__tests__/helpers/meta/clean-db.helper');
  const response = await prompts([
    {
      type: 'select',
      name: 'seedFunction',
      message: 'How should the database be seeded?',
      choices: [
        {
          title: 'Mockdata minimumForDev',
          description: `Creates mockdata useful for developing the geovistory with minimal data.`,
          value: minimumForDev.minimumForDev,
        },
        {
          title: 'Mockdata forFeatureX',
          description: `Fills the database with mock data. Few data, fast.`,
          value: featureX.forFeatureX,
        },
        {
          title: 'Mockdata with heavy factoids',
          description: `Fills the database with factoid mock data. A lot of data, not so fast.`,
          value: factoids.createHeavyFactoids,
        },
        {
          title: 'Mockdata forFullText',
          description: `Creates mockdata useful for developing the warehouse to produce full texts for entities.`,
          value: forFullText.forFullText,
        },
        {
          title: 'Mockdata for digitals',
          description: `Creates mockdata useful for digitals.`,
          value: digitals.digitalsSeeds,
        },
        {
          title: 'Mockdata for SysConfig Valid',
          description: `Deletes existing and inserts current SYS_CONFIC_VALID.`,
          value: sysConfig.updateSysConfig,
        },
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
          value: () => {},
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
  .then(_ => {
    console.log('Successfully seeded database!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
