'use strict'

var iso6393 = require('iso-639-3');


module.exports = function(app) {

  app.dataSources.postgres1.automigrate('Language', function(err) {
    if (err) throw err;

    app.models.Language.create(iso6393, function(err, languages) {
      if (err) throw err;

      console.log('Models created: \n', languages);
    });
  });

};