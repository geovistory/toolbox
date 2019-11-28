'use strict';

var request = require('request');
var url = require('url');

module.exports = ontoMeProxy;

function ontoMeProxy() {
  var dontProxyHeaderRegex = /^(?:Host|Proxy-Connection|Connection|Keep-Alive|Transfer-Encoding|TE|Trailer|Proxy-Authorization|Proxy-Authenticate|Upgrade)$/i;

  function filterHeaders(req, headers) {
    var result = {};
    // filter out headers that are listed in the regex above
    Object.keys(headers).forEach(function(name) {
      if (!dontProxyHeaderRegex.test(name)) {
        result[name] = headers[name];
      }
    });
    return result;
  }

  return function(req, res) {
    var q = req.query;
    var remoteUrl = 'https://ontome.dataforhistory.org/api/profiles.json/';

    request.get(
      {
        url: url.format(remoteUrl),
        headers: filterHeaders(req, req.headers),
        encoding: null,
        // proxy: proxy
      },
      function(error, response, body) {
        var code = 500;

        if (response) {
          code = response.statusCode;
          res.header(filterHeaders(req, response.headers));
        }

        res.status(code).send(body);
      }
    );
  };
}
