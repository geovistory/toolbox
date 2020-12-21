const getGvPgUrlForLoopback = require('../../dist/utils/databaseUrl').getGvPgUrlForLoopback
let config = {
  postgres1: {
    url: '',
    name: 'postgres1',
    connector: 'postgresql',
  },
  emailDs: {
    name: 'emailDs',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'asmtp.mail.hostpoint.ch',
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: 'info@geovistory.org',
          pass: 'jagen731!murre',
        },
      },
    ],
  },
};

config.postgres1.url = getGvPgUrlForLoopback()

module.exports = config;
