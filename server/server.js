'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var enforce = require('express-sslify');

const { Client } = require('pg')
const { Subject } = require('rxjs');

/**
 * Enfoce using ssl (https) on staging and production
 */
if (['production', 'staging'].includes(process.env.DB_ENV)) {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

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

    // Connect to Postgres
    const client = new Client({
      connectionString: app.datasources.postgres1.connector.settings.url,
    })
    client.connect()


    /**********************************************************
    * Setup the queue for warehouse update requests
    **********************************************************/
    const queue = [];
    let working = false;
    let skipped = 0;
    let executed = 0;
    let needs_update_for_labels = true;
    let needs_update_for_full_text = true;
    const nextFromQue = () => {

      if (!working && queue.length) {
        working = true;
        const fn = queue.pop();
        client.query('select ' + fn, (err, res) => {
          console.log(`
\u{1b}[32m Warehouse update request  Nr. ${(executed++)} \u{1b}[34m ${new Date().toString()}
    \u{1b}[33m Function call:  \u{1b}[0m ${fn}
    \u{1b}[31m ${err ? err : ''}  \u{1b}[0m
          `)
          working = false
          needs_update_for_labels = true;
          needs_update_for_full_text = true;
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

      // console.log(msg.channel, payload.fn)

      switch (msg.channel) {
        case 'warehouse_update_request':
          enQueue(payload.fn);
          break;
        case 'entity_preview_updated':
          app.models.WarEntityPreview.stream.next(payload);
//           console.log(`
// Entity Preview updated:
//         pk_entity: ${payload.pk_entity}
//         fk_project: ${payload.fk_project}
//         class_label: ${payload.class_label}
//         entity_label: ${payload.entity_label}
// `)
          break;
        default:
          break;
      }
      //dbEventEmitter.emit(msg.channel, payload);
    });


    /**********************************************************
     * Setup the continuous update job for entity_preview cols:
     *  - fk_class
     *  - entity_type
     *  - class_label
     *  - entity_label
     *  - time_span
     *  - fk_entity_label
     *  - fk_type
     *  - type_label
     * waiting 0 sec between finishing and restarting
    **********************************************************/
    const updateEntityPreviewLabels = () => {
      if (needs_update_for_labels) {

        const sql = `SELECT warehouse.entity_preview__labels__update_all();`
        client.query(sql, (err, res) => {
          if (err) console.log(err)
          else {
            needs_update_for_labels = false;
            console.log(`\u{1b}[36m Entity Preview labels updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`)
          }
          setTimeout(() => {
            updateEntityPreviewLabels();
          }, 0)
        })
      } else {
        setTimeout(() => {
          updateEntityPreviewLabels();
        }, 0)
      }
    }
    updateEntityPreviewLabels();

    /**********************************************************
       * Setup the continuous update job for entity_preview cols:
       *  - own_full_text
       *  - related_full_texts
       *  - full_text
       *  - ts_vector
       * waiting 10 sec between finishing and restarting
      **********************************************************/
    const updateEntityPreviewFullText = () => {
      if (needs_update_for_full_text) {

        const sql = `SELECT warehouse.entity_preview__full_text__update_all();`
        client.query(sql, (err, res) => {
          if (err) console.log(err)
          else {
            console.log(`\u{1b}[36m Entity Preview full text updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`);
            needs_update_for_full_text = false;
          }
          setTimeout(() => {
            updateEntityPreviewFullText();
          }, 10000)
        })
      } else {
        setTimeout(() => {
          updateEntityPreviewFullText();
        }, 10000)
      }
    }
    updateEntityPreviewFullText();

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
