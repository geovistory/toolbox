import {Client} from 'pg';
import {Logger} from './base/classes/Logger';
import {getDbFileSize, getMemoryUsage} from './base/functions';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {Edge} from './primary-ds/EdgeService';

// import { UpdateService } from './data-services/UpdateService';

export const PK_DEFAULT_CONFIG_PROJECT = 375669;
export const PK_ENGLISH = 18889;

interface NotificationHandler {
    channel: string
    listeners: {
        callback(): Promise<void>
    }[]

}

export class Warehouse {

    pgClient = new Client({
        connectionString: (process.env.DB_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL), // + '?ssl=true',
        ssl: {
            rejectUnauthorized: false,
        },
    });

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

        this.startListening()

        await this.clearDB()

        await this.initIndexes();

        await this.initUpdateRequests()

        // await this.updateService.runRecurciveCycle()
        await this.agg.start()

        Logger.itTook(t0, 'to start', 0)


        Logger.start(`Warehouse is (not yet) listening for pg notifications...\n\n`, 0);


        Logger.log(`The warehouse uses approximately ${getMemoryUsage()} MB of memory`);
        const diskUsage = await getDbFileSize()
        Logger.log(`The warehouse uses approximately ${diskUsage.readable} of disk space`)

        Logger.log('Example results')
        Logger.log(await this.agg.entityLabel.index.getFromIdx({
            fkProject: 591,
            pkEntity: 741589
        }))
        Logger.log(await this.agg.entityLabel.index.getFromIdx({
            fkProject: 591,
            pkEntity: 741570
        }))
        Logger.log(await this.agg.classLabel.index.getFromIdx({
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
        await this.prim.project.initIdx();
        await this.prim.dfhClassLabel.initIdx();
        await this.prim.proClassLabel.initIdx();

        await this.prim.edge.initIdx();

        await this.prim.entity.initIdx();

        // await this.prim.initAllIndexes()

        // await this.prim.entityLabelConfig.initIdx();

        // await this.prim.fieldsConfig.initIdx();

        // await this.prim.classLabel.initIdx();

        // await this.prim.fieldLabel.initIdx();

        Logger.itTook(t1, 'to initialize indexes', 0)
        this.initializingIndexes = false

    }

    // // used for testing
    // initMockDb(dbServices: DbServices) {
    //     this.db = dbServices
    // }
    async clearDB() {
        const t1 = Logger.start('Clear DB', 0)

        await this.prim.clearAll()

        await this.agg.clearAll()

        await this.dep.clearAll()

        Logger.itTook(t1, `to clear db`, 0)

    }

    async initUpdateRequests() {
        const t1 = Logger.start('Initialize Update Requests', 0)

        let length = 0;

        await this.prim.entity.index.forEachKey(async (entityId) => {
            // await this.updateService.addUpdateRequest(entityId)

            await this.agg.entityLabel.updater.addItemToQueue(entityId)

            length++
        })


        await this.prim.project.index.forEachKey(async (projectId) => {
            // await this.updateService.addUpdateRequest(entityId)
            await this.prim.dfhClassLabel.index.forEachKey(async (classLabelId) => {
                await this.agg.classLabel.updater.addItemToQueue({
                    fkProject: projectId.pkProject,
                    pkClass: classLabelId.pkClass
                });
                length++
            });

        })


        Logger.itTook(t1, `to initialize ${length} Update Requests`, 0)
    }

    /**
     * Registers a postgres db listener and add a notification handler
     * @param channel
     * @param callback
     */
    async registerDbListener(channel: string, callback: () => Promise<void>) {

        if (!this.notificationHandlers[channel]) {
            await this.pgClient.query(`LISTEN ${channel}`)
            this.notificationHandlers[channel] = {
                channel,
                listeners: []
            }
        }

        this.notificationHandlers[channel].listeners.push({
            callback
        })

    }

    /**
     * starts listening to notifications from postgres
     * and calls callback of notification handler, if available for the channel
     */
    startListening() {
        this.pgClient.on('notification', (msg) => {
            const handler = this.notificationHandlers[msg.channel];
            if (handler) handler.listeners.map(l => l.callback().catch(e => console.log(e)))
        });
    }

    async stop() {
        await this.pgClient.end()
    }
}




export interface FieldWithEdges {
    isOutgoing: boolean
    fkProperty: number
    edges: Edge[]
}
