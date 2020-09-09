const warhouse = require('./dist/warehouse');
warhouse
  .listen(__dirname)
  .catch(err => {
    console.log(`***************************************`);
    console.error('Warehouse was up and running, when this error occured:');
    console.error(err);
    console.log(`***************************************`);
    process.exit(1);
  });
