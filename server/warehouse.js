const warhouse = require('./dist/warehouse');
warhouse.main().catch(err => {
    console.error('Cannot start the warhouse.', err);
    process.exit(1);
  });