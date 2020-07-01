import {Client} from 'pg';
import {GeovistoryApplication} from '../../application';

/**
 * This class manages notifications from prostgres.
 *
 * - The manager connects to postgres
 * - The manager listenes to postgres notifications
 * - The manager performs actions when receiving notifications
 */
export class PostgresNotificationsManager {

  warUpdateNeeded = true;
  classLabelUpdateNeeded = true;
  statementUpdateNeeded = true;

  warUpdating = false;
  statementsUpdating = false;
  classLabelsUpdating = false;

  client: Client;
  client2: Client;

  /**
   * @param lb4App the Application Context to which we bind this manager
   */
  constructor(private lb4App: GeovistoryApplication) {}

  // create postgres client
  createClient() {
    return new Client({
      connectionString: process.env.DATABASE_URL + '?ssl=true',
      ssl: {
        rejectUnauthorized: true,
      },
    })
  }

  callQueueWorker() {
    if (!this.warUpdating) {
      this.warUpdating = true;
      this.warUpdateNeeded = false;
      this.client.query('SELECT war.updater()', (err, res) => {
        this.warUpdating = false;
        if (err) console.log(err);
        // console.log(res.rows[0].entity_preview_update_queue_worker )
        if (
          res?.rows?.length &&
          res.rows[0].updater === true
        ) {
          this.statementUpdateNeeded = true;
          this.updateStatements();
        }
        if (this.warUpdateNeeded) this.callQueueWorker();
      });
    }
  };

  updateStatements(matViewIsEmpty = false) {
    if (!this.statementsUpdating) {
      this.statementsUpdating = true;
      this.statementUpdateNeeded = false;
      // Do refresh the mat view. If the view is empty, concurrently is no option
      // see: https://www.postgresql.org/docs/9.4/sql-refreshmaterializedview.html
      const sql = `
      REFRESH MATERIALIZED VIEW ${matViewIsEmpty ? '' : 'CONCURRENTLY'}
      war.vm_statement;`;
      this.client2.query(sql, (err, res) => {
        this.statementsUpdating = false;
        if (err) {
          // TODO:
          // if (err.code === '0A000') {
          //   this.updateStatements(true);
          // } else {
          //   console.log(err);
          // }
        } else if (process.env.NO_LOGS !== 'true') {
          console.log(
            `\u{1b}[36m war.vm_statement updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`
          );
        }
        if (this.statementUpdateNeeded) this.updateStatements();
      });
      // // delay a little
      // setTimeout(() => {
      // }, 2000)
    }
  };

  updateClassLabels() {
    if (!this.classLabelsUpdating) {
      this.classLabelsUpdating = true;
      this.classLabelUpdateNeeded = false;
      const sql = `SELECT war.entity_preview__update_class_labels();`;
      this.client2.query(sql, (err, res) => {
        this.classLabelsUpdating = false;
        if (err) console.log(err);
        else if (process.env.NO_LOGS !== 'true') {
          console.log(
            `\u{1b}[36m war.entity_preview class_labels updated \u{1b}[34m ${new Date().toString()}\u{1b}[0m`
          );
        }
        if (this.classLabelUpdateNeeded) this.updateClassLabels();
      });
    }
  };

  reactOnNotifications() {
    // Listen for all pg_notify channel messages
    this.client.on('notification', (msg) => {
      switch (msg.channel) {
        case 'project_updated':
          this.warUpdateNeeded = true;
          this.callQueueWorker();
          break;
        case 'entity_previews_updated':
          if (msg.payload) {
            this.lb4App.streams.warEntityPreviewModificationTmsp$.next(msg.payload);
          }
          break;
        case 'need_to_check_class_labels':
          this.classLabelUpdateNeeded = true;
          this.updateClassLabels();
          break;
        default:
          break;
      }
    });
  }

  /**
   * Designate which channels we are listening on.
   * Add additional channels with multiple lines.
   */
  async listenToPgNotifyChannels() {
    await this.client.query('LISTEN project_updated');
    await this.client.query('LISTEN entity_previews_updated');
    await this.client.query('LISTEN need_to_check_class_labels');
  }

  /**
   * Start the manager
   */
  async start() {
    // create postgres client for war.updater() queue
    this.client = this.createClient();
    await this.client.connect()
    this.callQueueWorker();

    // react to notifications
    this.reactOnNotifications()

    // start listening on pg notifications
    await this.listenToPgNotifyChannels()

    // create postgres client for war.vm_statement queue
    this.client2 = this.createClient();
    await this.client2.connect()
    this.updateStatements();
    this.updateClassLabels();

  }

  /**
   * stop the manager
   */
  async stop() {
    // disconnect clients from pg server
    // await this.client.end()
    // await this.client2.end()

  }

}
