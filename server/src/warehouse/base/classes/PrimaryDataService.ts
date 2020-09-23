import QueryStream from 'pg-query-stream';
import prettyms from 'pretty-ms';
import {BehaviorSubject} from 'rxjs';
import {Warehouse} from '../../Warehouse';
import {ClearAll} from './ClearAll';
import {DataService} from './DataService';
import {IndexDBGeneric} from './IndexDBGeneric';
import {Logger} from './Logger';

export abstract class PrimaryDataService<DbItem, KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> implements ClearAll {

    // number of iterations before measurin time an memory
    abstract measure: number;

    // True if sync() is running
    syncing$ = new BehaviorSubject(false);

    // True if running sync() should restart right after finishing
    restartSyncing = false;

    index: IndexDBGeneric<KeyModel, ValueModel>

    // a meta index where each primary data service can store its catchup date
    meta: IndexDBGeneric<string, string>


    constructor(
        public wh: Warehouse,
        private listenTo: string[],
        public keyToString: (key: KeyModel) => string,
        public stringToKey: (str: string) => KeyModel,
    ) {
        super()
        this.index = new IndexDBGeneric(
            keyToString,
            stringToKey,
            this.constructor.name,
            wh
        )
        this.meta = new IndexDBGeneric(
            (key: string) => key,
            (str: string) => str,
            this.constructor.name + '_meta',
            wh
        )


    }

    /**
     * init idx
     */
    async initIdx() {
        await this.clearAll()

        await this.addPgListeners()

        const dbNow = await this.wh.pgClient.query('SELECT now() as now');

        await this.sync(new Date(dbNow.rows?.[0]?.now))

    }

    /**
     * start listening
     * @param date Will look for changes since date.
     */
    async startAndSyncSince(lastUpdateBegin: Date) {
        await this.addPgListeners()

        await this.setLastUpdateBegin(lastUpdateBegin)

        await this.sync(lastUpdateBegin)
    }


    async catchUp() {

        const lastUpdateDone = await this.getLastUpdateDone()
        if (lastUpdateDone) {
            Logger.msg(`${this.constructor.name} > Catch up changes since ${lastUpdateDone}`);
            await this.startAndSyncSince(lastUpdateDone)
        }
        else {
            Logger.msg(`WARNING: ${this.constructor.name} > no lastUpdateDone date found for catchUp()!`)
            await this.initIdx()
        }
    }

    async clearAll() {
        await Promise.all([this.index.clearIdx(), this.meta.clearIdx()])
    }

    /**
     * Adds the postgres listener
     * @param listenTo
     */
    private async addPgListeners() {
        for (const eventName of this.listenTo) {
            await this.wh.registerDbListener(
                eventName,
                (tmsp: Date) => this.sync(tmsp),
                this.constructor.name
            )
        }
    }

    /**
     *
     * @param tmsp the timestamp of oldest modification considered for syncing
     */
    async sync(tmsp: Date) {

        // If syncing is true, it sets restartSyncing to true and stops the function here
        if (this.syncing$.value) {
            this.restartSyncing = true
            return;
        }

        // Else sets syncing to true and restartSyncing to false
        this.syncing$.next(true);
        this.restartSyncing = false;

        // throttle sync process for 10 ms
        // await new Promise((res, rej) => { setTimeout(() => { res() }, 10) })
        const lastUpdateBegin = await this.getLastUpdateBegin()
        const t1 = Logger.start(`${this.constructor.name} > manageUpdatesSince ${lastUpdateBegin}`, 1);

        // Look for updates since the date of lastUpdateBegin or 1970
        const calls = [
            this.manageUpdatesSince(lastUpdateBegin)
        ]

        // Look for deletes if
        // - there is a deleteSql and
        // - this data service has ever been synced

        if (lastUpdateBegin) {
            const deleteSql = this.getDeletesSql(lastUpdateBegin)
            if (deleteSql !== '') calls.push(this.manageDeletesSince(lastUpdateBegin, deleteSql))
        }

        // set lastUpdateBegin to timestamp that was used to run this sync
        // process.
        await this.setLastUpdateBegin(tmsp)

        // await the calls produced above
        const [updates, deletes] = await Promise.all(calls);
        Logger.itTook(t1, `to manage ${updates} updates and ${deletes ?? 0} deletes by ${this.constructor.name}`, 1);

        this.syncing$.next(false)
        if (this.restartSyncing) await this.sync(tmsp);

        await this.setLastUpdateDone(tmsp)

    }

    /**
     * Executes SQL query to GvDB to get all items that have been inserted or updated since date.
     *
     * The type of a row in the query result must be InitItem.
     *
     * Since query result can be huge, results are streamed (using pg-query-stream).
     *
     *  On each streamed item, the function calls putInitItem(item)
     *
     * @param date
     */
    private async manageUpdatesSince(date?: Date) {

        const t2 = Logger.start(`Start update query  ...`, 2);
        const d = date ?? new Date(0);
        const query = new QueryStream(this.getUpdatesSql(d), [d])

        const stream = this.wh.pgClient.query(query)
        let minMeasure: number | null = null, maxMeasure: number | null = null;
        let i = 0;
        return new Promise((res, rej) => {

            let t3 = Logger.getTime()
            let t4 = Logger.getTime()
            stream.once('data', _ => {
                Logger.itTook(t2, `to run update query.`, 2);
                t3 = Logger.start(`Start putting items from stream ...`, 2)
                t4 = Logger.getTime()
            })
            stream.on('data', (item: DbItem) => {

                i++;
                // if no date we are in the initial sync process
                if (!date) {
                    // no need to check for existing vals
                    const {key, val} = this.dbItemToKeyVal(item)
                    this.index.addToIdx(key, val).catch((e) => {
                        stream.destroy();
                        rej(e);
                    });
                    this.afterPut$.next({key, val})
                } else {
                    // put item, and compare to existing vals and add update request if needed
                    this.putDbItem(item)
                        // .then(() => {
                        //     // for debugging only: allows acceptance test to wait
                        //     // until value was updated
                        //     this.afterPut$.next(item)
                        // })
                        .catch((e) => {
                            stream.destroy();
                            rej(e);
                        });;
                }

                i++
                if (i % this.measure === 0) {
                    // Logger.resetLine()
                    const time = Logger.itTook(t3, `to put ${this.measure} items to index of ${this.constructor.name} – done so far: ${i}`, 2)
                    t3 = Logger.getTime()
                    if (!minMeasure || minMeasure > time) minMeasure = time;
                    if (!maxMeasure || maxMeasure < time) maxMeasure = time;
                }

            })
            stream.on('error', (e) => {
                rej(e)
            })

            stream.on('end', () => {
                res(i)
                // Logger.resetLine()
                if (minMeasure && maxMeasure) {
                    Logger.itTook(t4, `to put ${i} items to index of ${this.constructor.name}  –  fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 2);
                } else {
                    Logger.itTook(t4, `to put ${i} items to index of ${this.constructor.name}`, 2);
                }
            })


        })




    }

    /**
     * Executes SQL query to GvDB to get all items that have been deleted since date.
     *
     * The type of a row in the query result must be KeyModel.
     *
     * Since query result can be huge, results are streamed (using pg-query-stream).
     *
     * On each streamed key, the function calls delItem(key)
     * @param date
     */
    private async manageDeletesSince(date: Date, deleteSql: string) {
        const t2 = Logger.start(`Start deletes query  ...`, 2);
        const query = new QueryStream(deleteSql, [date])

        const stream = this.wh.pgClient.query(query)
        let minMeasure: number | null = null, maxMeasure: number | null = null;
        let i = 0;
        return new Promise((res, rej) => {

            let t3 = Logger.getTime()
            let t4 = Logger.getTime()
            stream.once('data', _ => {
                Logger.itTook(t2, `to run delete query.`, 2);
                t3 = Logger.start(`Start deleting items from stream ...`, 2)
                t4 = Logger.getTime()
            })
            stream.on('data', (item: KeyModel) => {

                i++;

                // delete item and add update request if needed
                this.del(item)
                    .catch((e) => {
                        stream.destroy();
                        rej(e);
                    });;


                i++
                if (i % this.measure === 0) {
                    // Logger.resetLine()
                    const time = Logger.itTook(t3, `to delete ${this.measure} items from index of ${this.constructor.name} – done so far: ${i}`, 2)
                    t3 = Logger.getTime()
                    if (!minMeasure || minMeasure > time) minMeasure = time;
                    if (!maxMeasure || maxMeasure < time) maxMeasure = time;
                }

            })
            stream.on('error', (e) => {
                rej(e)
            })

            stream.on('end', () => {
                res(i)
                // Logger.resetLine()
                if (minMeasure && maxMeasure) {
                    Logger.itTook(t4, `to delete ${i} items from index of ${this.constructor.name}  –  fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 2);
                } else {
                    Logger.itTook(t4, `to delete ${i} items from index of ${this.constructor.name}`, 2);
                }
            })


        })


    }

    /**
     * Converts item to key-value pair. Must be implemented by derived class.
     *
     * @param item
     */
    abstract dbItemToKeyVal(item: DbItem): {key: KeyModel, val: ValueModel}

    /**
     * Puts dbItem into index using put() function
     * which counts responsible for informing receivers to update themselfs.
     * @param item
     */
    private async putDbItem(item: DbItem) {
        const pair = this.dbItemToKeyVal(item);
        await this.put(pair.key, pair.val)
    }

    // sql statement used to query updates for the index
    abstract getUpdatesSql(tmsp: Date): string;

    // sql statement used to query deletes for the index
    // if the warehouse does not need to consider deletets, set this to null
    abstract getDeletesSql(tmsp: Date): string;


    // The following 4 function are for:
    // Storing date and time of the last time the function sync() was called,
    // marking the begin of the sync() process, which can be considerably earlier
    // than its end. It is null until sync() is called the first time.

    async setLastUpdateBegin(date: Date) {
        await this.meta.addToIdx('lastUpdateBegin', date.toISOString())
    }
    async getLastUpdateBegin(): Promise<Date | undefined> {
        const isoDate = await this.meta.getFromIdx('lastUpdateBegin')
        return isoDate ? new Date(isoDate) : undefined
    }
    async setLastUpdateDone(date: Date) {
        await this.meta.addToIdx('lastUpdateDone', date.toISOString())
    }
    async getLastUpdateDone(): Promise<Date | undefined> {
        const isoDate = await this.meta.getFromIdx('lastUpdateDone')
        return isoDate ? new Date(isoDate) : undefined
    }
}
