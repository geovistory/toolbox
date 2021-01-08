require('./__dotenv');
const chooseDB = require('./__chooseGvDb');

async function start() {
  await chooseDB();
  require('./__execShell').fromFile('../db-migrate/up.sh');
}
start().catch(e => console.log(e));
