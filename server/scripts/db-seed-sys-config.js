require('./__dotenv');
const prompts = require('prompts');
let sysConfig;
async function getUserInputs() {
  process.env.DATABASE_URL = process.env.GV_DB_FOR_SEEDING;
  const response = await prompts([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Update sys config in db ${process.env.DATABASE_URL}?`,
    },
  ]);
  if (!response.confirm) {
    console.log('exit');
    process.exit();
  }
  sysConfig = require('../dist/__tests__/helpers/graphs/sys-config-valid.helper');

  return response;
}

async function start() {
  await getUserInputs();
  await sysConfig.updateSysConfig();
}

start()
  .then(_ => {
    console.log('Successfully updated sys config!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
