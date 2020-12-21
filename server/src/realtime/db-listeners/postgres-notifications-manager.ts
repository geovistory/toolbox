import {Client, ClientConfig} from 'pg';
import {parse} from 'pg-connection-string';
import {GeovistoryApplication} from '../../application';
import {getPgSslForPg8, getPgUrlForPg8} from '../../utils/databaseUrl';

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

  vmStatementUpdated = '1970-01-01 10:08:21.128869+00';

  /**
   * @param lb4App the Application Context to which we bind this manager
   */
  constructor(private lb4App: GeovistoryApplication) { }

  // create postgres client
  createClient() {
    const connectionString = getPgUrlForPg8()
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
    this.client2 = this.createClient();

    await this.client.connect();
    await this.client2.connect();
    // this.callQueueWorker();

    // react to notifications
    this.reactOnNotifications()

    this.startVmStatementsUpdateJob().catch(e => console.log(e))

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
      await this.client2.end()
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }

  }
  /**
   * Starts a job that periodically updates war.vm_statement
   */
  async startVmStatementsUpdateJob() {

    const changes = await this.client2.query<{count: number, now: string}>(`
      Select   count(*),  to_char (now()::timestamp at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') now
      From     projects.info_proj_rel t1
      Where    t1.tmsp_last_modification::timestamp >=$1;
    	`, [this.vmStatementUpdated])

    this.vmStatementUpdated = changes.rows?.[0].now;

    if (changes.rows?.[0].count > 0) {
      await this.client2.query('REFRESH MATERIALIZED VIEW CONCURRENTLY war.vm_statement;')
    }

    setTimeout(() => {
      this.startVmStatementsUpdateJob().catch(e => console.log(e))
    }, 3000)

  }
}

