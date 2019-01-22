'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
const { Client } = require('pg')
const { Subject } = require('rxjs');


app.start = function () {
  // start the web server
  var server = app.listen(function () {
    app.emit('started', server);
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }

    /**********************************************************
     * Setup the Refreshing of the Materialized View 
     **********************************************************/
    // const connector = app.dataSources.postgres1.connector;

    // // continuously refreshing the materialized view, if nedded
    // const refreshMaterializedView = () => {
    //   setTimeout(() => {
    //     const sql_stmt = 'SELECT information.refresh_vm_data_unit_preview();';
    //     const params = [];
    //     connector.execute(sql_stmt, params, (err, resultObjects) => {
    //       refreshMaterializedView()
    //       console.log('Refreshed vm_data_unit_preview: ', resultObjects[0].refresh_vm_data_unit_preview)
    //     });
    //   }, 1000)
    // }

    // // refresh Mat View on Startup
    // connector.execute('REFRESH MATERIALIZED VIEW CONCURRENTLY information.vm_data_unit_preview;', [], (err, resultObjects) => {
    //   console.log('Refreshed vm_data_unit_preview on Start of Node App')
    //   refreshMaterializedView()
    // });


     /**********************************************************
     * Setup the queue for warehouse update requests
     **********************************************************/
    // Connect to Postgres 
    const client = new Client({
      connectionString: app.datasources.postgres1.connector.settings.url,
    })
    client.connect()

    const queue = [];
    let working = false;
    let skipped=0;
    let executed=0;
    const nextFromQue = () => {

      if(!working && queue.length){
        working = true;
        const fn = queue.pop();
        client.query('select ' + fn, (err,res)=>{
          // console.log('executed', (executed ++))
          working = false
          nextFromQue();
        })
      }

    }

    const enQueue = (fn) => {
      if (!queue.includes(fn)) {
        queue.push(fn);
        // console.log('enQueued', fn)
          nextFromQue();
      }
      // else{
      //   console.log('skipped', (skipped ++))
      // }
    }

    // initialize event streams on loopback models
    app.models.WarEntityPreview.stream = new Subject();

    // Listen for all pg_notify channel messages
    client.on('notification', function (msg) {
      let payload = JSON.parse(msg.payload);

      //console.log(payload.fn)
      switch (msg.channel) {
        case 'warehouse_update_request':
          enQueue(payload.fn);
          break;
        case 'entity_preview_updated':
          app.models.WarEntityPreview.stream.next(payload);
          break;
        default:
          break;
      }
      //dbEventEmitter.emit(msg.channel, payload);
    });

    // Designate which channels we are listening on. Add additional channels with multiple lines.
    client.query('LISTEN warehouse_update_request');
    client.query('LISTEN entity_preview_updated');

  });


  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    var server = app.start();

    // add socket.io and emit it to be ready
    var io = require('socket.io')(server);
    app.emit('io-ready', io);

  }
});
