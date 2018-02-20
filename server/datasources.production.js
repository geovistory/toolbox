
let config = {
  "postgres1": {
    "url": "",
    "name": "postgres1",
    "connector": "postgresql"
  },
  "emailDs": {
    "name": "emailDs",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": "asmtp.mail.hostpoint.ch",
        "secure": true,
        "port": 465,
        "tls": {
          "rejectUnauthorized": false
        },
        "auth": {
          "user": "jonas.schneider@kleiolab.ch",
          "pass": "loht26-salbt"
        }
      }
    ]
  }
}

/**
 * Add the Database URL according to the value of DB_ENV
 */
switch (process.env.DB_ENV) {

  case "development":
  config.postgres1.url = process.env.GEOV_DEV_DATABASE_URL;
  break;
  
  case "review":
  config.postgres1.user = process.env.GEOV_REV_DB_USER;
  config.postgres1.password = process.env.GEOV_REV_DB_PASSWORD;
  config.postgres1.host = process.env.GEOV_REV_DB_HOST;
  config.postgres1.port = process.env.GEOV_REV_DB_PORT;
  config.postgres1.database = process.env.HEROKU_APP_NAME;
  config.postgres1.ssl = process.env.GEOV_REV_DB_SSL;
  break;

  case "staging":
  config.postgres1.url = process.env.GEOV_STAG_DATABASE_URL;
  break;

  case "production":
  config.postgres1.url = process.env.GEOV_PROD_DATABASE_URL;
  break;

  default:
  console.log("Sorry, we don't have a config for DB_ENV='" + process.env.DB_ENV + "'.");

}


module.exports = config;