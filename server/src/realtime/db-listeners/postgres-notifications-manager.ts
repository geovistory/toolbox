import {Client} from 'pg';
import {GeovistoryApplication} from '../../application';
import {getPgUrlForPg8, getPgSslForPg8} from '../../utils/databaseUrl';

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
  constructor(private lb4App: GeovistoryApplication) { }

  // create postgres client
  createClient() {
    const connectionString = getPgUrlForPg8()
    return new Client({
      connectionString,
      ssl: getPgSslForPg8(connectionString),
    })
  }


  reactOnNotifications() {
    // Listen for all pg_notify channel messages
    this.client.on('notification', (msg) => {
      switch (msg.channel) {
        case 'entity_previews_updated':
          if (msg.payload) {
            this.lb4App.streams.warEntityPreviewModificationTmsp$.next(msg.payload);
          }
          break;
        case 'warehouse_initializing':
          if (msg.payload) {
            this.lb4App.streams.warehouseInitializing$.next(msg.payload === 'true');
          }
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
    await this.client.query('LISTEN entity_previews_updated');
    await this.client.query('LISTEN warehouse_initializing');
  }

  /**
   * Start the manager
   */
  async start() {
    // create postgres client for war.updater() queue
    this.client = this.createClient();



    await this.client.connect();
    // this.callQueueWorker();

    // react to notifications
    this.reactOnNotifications()

    // start listening on pg notifications
    await this.listenToPgNotifyChannels()


  }

  /**
   * stop the manager
   */
  async stop() {
    // disconnect clients from pg server
    try {
      await this.client.end()
      // await this.client2.end()
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }

  }

}
