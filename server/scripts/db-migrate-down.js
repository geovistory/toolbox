require('./__dotenv');
const chooseDB = require('./__choosedb');

async function start() {
  await chooseDB();
  require('./__execShell').fromFile('../db-migrate/down.sh');
}
start().catch(e => console.log(e));
