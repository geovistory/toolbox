/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable object-curly-spacing */
'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = (module.exports = loopback());

var enforce = require('express-sslify');

const { Client } = require('pg');
const { Subject } = require('rxjs');

/**
 * Enfoce using ssl (https) on staging and production
 */
if (['production', 'staging'].includes(process.env.DB_ENV)) {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
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
      ssl: {
        rejectUnauthorized: true,
      },
    });
    client.connect();

    // Connect to Postgres a second time for parrallel sessions
    const client2 = new Client({
      connectionString: app.datasources.postgres1.connector.settings.url,
      ssl: {
        rejectUnauthorized: true,
      },
    });
    client2.connect();

    /**********************************************************
     * Setup the queue for warehouse update requests
     **********************************************************/

    let needs_update_from_queue = true;
    let need_to_check_class_labels = true;
    let needs_update_for_statements = true;

    /**
     * continuously check if there is something in the update queue
     */
    let workerWorking = false;
    const callQueueWorker = () => {
      if (!workerWorking) {
        workerWorking = true;
        needs_update_from_queue = false;
        client.query('SELECT war.updater()', (err, res) => {
          workerWorking = false;
          if (err) console.log(err);
          // console.log(res.rows[0].entity_preview_update_queue_worker )
          if (
            res &&
            res.rows &&
            res.rows.length &&
            res.rows[0].updater === true
          ) {
            needs_update_for_statements = true;
            updateStatements();
          }
          if (needs_update_from_queue) callQueueWorker();
        });
      }
    };
    callQueueWorker();

    // initialize event streams on loopback models
    app.models.WarEntityPreview.stream = new Subject();

    // Listen for all pg_notify channel messages
    client.on('notification', function (msg) {
      switch (msg.channel) {
        case 'project_updated':
          needs_update_from_queue = true;
          callQueueWorker();
          break;
        case 'entity_previews_updated':
          if (msg.payload) {
            app.models.WarEntityPreview.stream.next(msg.payload);
          }
          break;
        case 'need_to_check_class_labels':
          need_to_check_class_labels = true;
          updateClassLabels();
          break;
        default:
          break;
      }
    });

    /**********************************************************
     * Setup the continuous update job for vm_statement
     **********************************************************/
    let statementsUpdating = false;
    const updateStatements = (matViewIsEmpty = false) => {
      if (!statementsUpdating) {
        statementsUpdating = true;
        needs_update_for_statements = false;
        // Do refresh the mat view. If the view is empty, concurrently is no option
        // see: https://www.postgresql.org/docs/9.4/sql-refreshmaterializedview.html
        const sql = `
        REFRESH MATERIALIZED VIEW ${matViewIsEmpty ? '' : 'CONCURRENTLY'}
        war.vm_statement;`;
        client2.query(sql, (err, res) => {
          statementsUpdating = false;
          if (err) {
            if (err.code == '0A000') {
              updateStatements(true);
            } else {
              console.log(err);
            }
          } else {
            console.log(
              `\u{1b}[36m war.vm_statement updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`
            );
          }
          if (needs_update_for_statements) updateStatements();
        });
        // // delay a little
        // setTimeout(() => {
        // }, 2000)
      }
    };
    updateStatements();

    /**********************************************************
     * Setup the continuous update job for class_labels
     **********************************************************/
    let classLabelsUpdating = false;
    const updateClassLabels = () => {
      if (!classLabelsUpdating) {
        classLabelsUpdating = true;
        need_to_check_class_labels = false;
        const sql = `SELECT war.entity_preview__update_class_labels();`;
        client2.query(sql, (err, res) => {
          classLabelsUpdating = false;
          if (err) console.log(err);
          else {
            console.log(
              `\u{1b}[36m war.entity_preview class_labels updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`
            );
          }
          if (need_to_check_class_labels) updateClassLabels();
        });
      }
    };
    updateClassLabels();

    // Designate which channels we are listening on. Add additional channels with multiple lines.
    client.query('LISTEN project_updated');
    client.query('LISTEN entity_previews_updated');
    client.query('LISTEN need_to_check_class_labels');
    client.query('LISTEN test');
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