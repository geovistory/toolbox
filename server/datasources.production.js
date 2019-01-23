
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
          "user": "info@geovistory.org",
          "pass": "jagen731!murre"
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
  config.postgres1.url = process.env.DATABASE_URL;
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