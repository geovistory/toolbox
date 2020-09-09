const warhouse = require('./dist/warehouse');
warhouse
  .init(__dirname)
  .then(() => {
    console.log(`***************************************`);
    console.log(`Warehouse initialized successfully!`);
    console.log(`***************************************`);
    process.exit(0);
  })
  .catch(err => {
    console.log(`***************************************`);
    console.error('Warehouse cannot be initialized:');
    console.error(err);
    console.log(`***************************************`);
    process.exit(1);
  });
