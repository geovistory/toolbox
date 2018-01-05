
module.exports = {
  "postgres1": {
    "url": process.env.GEOV_PROD_DATABASE_URL,
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
