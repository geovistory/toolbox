require('./__dotenv');
const chooseDB = require('./__chooseGvDb');

async function start() {
  await chooseDB();
  const application = require('../dist/webserver');
  application.main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

start().catch(e => console.error(e));
