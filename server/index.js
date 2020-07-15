const application = require('./dist');
const PORT = +(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0'

module.exports = application;

if (require.main === module) {
  console.log('$PORT:', PORT);
  // Run the application
  const config = {
    rest: {
      port: PORT,
      host: HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },

      // Added for mounting Lb3 in Lb4 setup
      // https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
      listenOnStart: false,
    },
    websocket: {
      port: PORT,
    },
  };

  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
