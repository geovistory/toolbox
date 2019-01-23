'use strict';

var request = require('request');
var url = require('url');

module.exports = requestLogger;

function requestLogger() {
    return function (req, res, next) {
        console.log(
`
\u{1b}[35m Incoming Request \u{1b}[34m ${new Date().toString()}  \u{1b}[0m 
    \u{1b}[33m Path: \u{1b}[0m ${req.path}
    \u{1b}[33m Method: \u{1b}[0m ${req.method}
    \u{1b}[33m Header > authorization: \u{1b}[0m ${req.headers.authorization}
    \u{1b}[33m Query > access_token: \u{1b}[0m ${req.query.access_token}
            `)
        next()

    }
}
