import {Client, ClientConfig} from 'pg';
import {parse} from 'pg-connection-string';
import {GeovistoryApplication} from '../../application';
import {WarFieldChange} from '../../models/war-field-change.model';
import {getGvDatabaseUrl, getPgSslForPg8} from '../../utils/databaseUrl';

/**
 * This class manages notifications from prostgres.
 *
 * - The manager connects to postgres
 * - The manager listenes to postgres notifications
 * - The manager performs actions when receiving notifications
 */
export class PostgresNotificationsManager {

  client: Client;

  /**
   * @param lb4App the Application Context to which we bind this manager
   */
  constructor(private lb4App: GeovistoryApplication) { }

  // create postgres client
  createClient() {
    const connectionString = getGvDatabaseUrl()
    const pgConfig = parse(connectionString) as ClientConfig
    pgConfig.ssl = getPgSslForPg8(connectionString)
    return new Client(pgConfig)
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
        case 'field_change':
          try {
            if (msg.payload) {
              const fieldChange: WarFieldChange = JSON.parse(msg.payload)
              this.lb4App.streams.warFieldChanges$.next(fieldChange);
            }
          } catch (error) {
            console.log(error);
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
    await this.client.query('LISTEN field_change');
  }

  /**
   * Start the manager
   */
  async start() {
    // create postgres client to listen to pg_notify()
    this.client = this.createClient();

    // connect client
    await this.client.connect();

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
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }

  }
}

