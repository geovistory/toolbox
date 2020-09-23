const indexDev = require('./dist/index.dev.js');
const PORT = +(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0'

module.exports = indexDev;

if (require.main === module) {
  // Run the app
  const config = {
    rest: {
      port: PORT,
      host: HOST,
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        setServersFromRequest: true,
      },
      listenOnStart: false,
    },
    websocket: {
      port: PORT,
    },
  };

  indexDev.serveWithMockData(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
