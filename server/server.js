'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  var server = app.listen(function() {
    app.emit('started', server);
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }

    // continuously refreshing the materialized view, if nedded
    const connector = app.dataSources.postgres1.connector;
    const refreshMaterializedView = () => {
      setTimeout(()=>{
        const sql_stmt = 'SELECT information.refresh_vm_data_unit_preview();';
        const params = [];
        connector.execute(sql_stmt, params, (err, resultObjects) => {
          refreshMaterializedView()
          console.log('Refreshed vm_data_unit_preview: ', resultObjects[0].refresh_vm_data_unit_preview)
        });    
      }, 1000)
    }
    refreshMaterializedView()
   
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
