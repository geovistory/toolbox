import {Client} from 'pg';
import {getPgSslForPg8, getPgUrlForPg8} from '../utils/databaseUrl';
import {Logger} from './base/classes/Logger';
import {getDbFileSize, getMemoryUsage} from './base/functions';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {Edge} from './primary-ds/PEdgeService';

// import { UpdateService } from './data-services/UpdateService';

export const PK_DEFAULT_CONFIG_PROJECT = 375669;
export const PK_ENGLISH = 18889;

interface NotificationHandler {
    channel: string
    listeners: {
        listenerName: string,
        callback(date: Date): Promise<void>
    }[]

}

export class Warehouse {

    pgClient: Client

    // Indexes holding data given by db
    prim: PrimaryDataServices;

    // Indexed holding resulting data deferred by warehouse
    agg: AggregatedDataServices;

    // Indexes holding dependencies between primary and secondary data
    dep: DependencyDataServices

    // updateService: UpdateService

    initializingIndexes = false

    notificationHandlers: {[key: string]: NotificationHandler} = {}

    constructor() {
        const connectionString = getPgUrlForPg8()
        const ssl = getPgSslForPg8()
        this.pgClient = new Client({
            connectionString,
            ssl
        });
        Logger.msg(`create warehouse for DB: ${connectionString.split('@')[1]}`)
        this.prim = new PrimaryDataServices(this)
        this.agg = new AggregatedDataServices(this)
        this.dep = new DependencyDataServices(this)
        // this.updateService = new UpdateService(this)
    }

    /**
     * Start warehouse service
     */
    async start() {


        const t0 = Logger.start('Start Warehouse', 0)

        await this.pgClient.connect();

        await this.clearWhDB()

        this.startListening()

        await this.initIndexes();

        await this.initUpdateRequests()

        await this.agg.start()

        Logger.itTook(t0, 'to start', 0)


        Logger.start(`Warehouse is (not yet) listening for pg notifications...\n\n`, 0);


        Logger.log(`The warehouse uses approximately ${getMemoryUsage()} MB of memory`);
        const diskUsage = await getDbFileSize()
        Logger.log(`The warehouse uses approximately ${diskUsage.readable} of disk space`)

        Logger.log('Example results')
        Logger.log(await this.agg.pEntityLabel.index.getFromIdx({
            fkProject: 591,
            pkEntity: 741589
        }))
        Logger.log(await this.agg.pEntityLabel.index.getFromIdx({
            fkProject: 591,
            pkEntity: 741570
        }))
        Logger.log(await this.agg.pClassLabel.index.getFromIdx({
            fkProject: 591,
            pkClass: 365
        }))

    };


    /**
     * (re-)create all indexes
     */
    async initIndexes() {
        this.initializingIndexes = true
        const t1 = Logger.start('Initialize indexes', 0)

        await this.prim.initAllIndexes()

        Logger.itTook(t1, 'to initialize indexes', 0)
        this.initializingIndexes = false
    }

    // // used for testing
    // initMockDb(dbServices: DbServices) {
    //     this.db = dbServices
    // }
    async clearWhDB() {
        const t1 = Logger.start('Clear DB', 0)

        await this.prim.clearAll()

        await this.agg.clearAll()

        await this.dep.clearAll()

        Logger.itTook(t1, `to clear db`, 0)

    }

    async initUpdateRequests() {
        const t1 = Logger.start('Initialize Update Requests', 0)

        const length = 0;

        // await this.prim.pEntity.index.forEachKey(async (entityId) => {
        //     // await this.updateService.addUpdateRequest(entityId)

        //     // await this.agg.entityLabel.updater.addItemToQueue(entityId)

        //     length++
        // })


        // await this.prim.project.index.forEachKey(async (projectId) => {
        //     // await this.updateService.addUpdateRequest(entityId)
        //     await this.prim.dfhClassLabel.index.forEachKey(async (classLabelId) => {
        //         await this.agg.classLabel.updater.addItemToQueue({
        //             fkProject: projectId.pkProject,
        //             pkClass: classLabelId.pkClass
        //         });
        //         length++
        //     });

        // })


        Logger.itTook(t1, `to initialize ${length} Update Requests`, 0)
    }

    /**
     * Registers a postgres db listener and add a notification handler
     * @param channel
     * @param callback
     * @param name for debugging
     */
    async registerDbListener(channel: string, callback: (date: Date) => Promise<void>, listenerName: string) {
        await this.pgClient.query(`LISTEN ${channel}`)
        this.notificationHandlers[channel] = {
            channel,
            listeners: [
                ...(this.notificationHandlers?.[channel]?.listeners ?? []),
                {
                    listenerName,
                    callback
                }
            ]
        }
    }

    /**
     * starts listening to notifications from postgres
     * and calls callback of notification handler, if available for the channel
     */
    startListening() {
        this.pgClient.on('notification', (msg) => {
            const handler = this.notificationHandlers[msg.channel];
            if (typeof msg.payload === 'string') {
                const date = new Date(msg.payload);
                if (isNaN(date.getTime())) console.error(`Invalid Timestamp provided by pg_notify channel ${msg.channel}`, msg.payload)
                else if (handler) handler.listeners.map(l => {
                    l.callback(date).catch(e => console.log(e))
                })
            } else {
                console.error('payload of notification must be a string convertable to date')
            }
        });
    }

    async stop() {
        this.notificationHandlers = {}
        await this.pgClient.end();
    }
}




export interface FieldWithEdges {
    isOutgoing: boolean
    fkProperty: number
    edges: Edge[]
}
