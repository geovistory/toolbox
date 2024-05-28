require('./__dotenv');
const chooseDB = require('./__chooseGvDb');

async function start() {
  await chooseDB();
  require('./__execShell').fromFile('../../database/migrations/db-migrate/up.sh');
}
start().catch(e => console.log(e));
