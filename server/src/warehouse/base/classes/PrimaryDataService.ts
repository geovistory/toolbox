import QueryStream from 'pg-query-stream';
import prettyms from 'pretty-ms';
import {Warehouse} from '../../Warehouse';
import {DataService} from './DataService';
import {Logger} from './Logger';


export abstract class PrimaryDataService<DbItem, KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> {


    // number of iterations before measurin time an memory
    abstract measure: number;

    // sql statement used to query updates for the index
    abstract updatesSql: string;

    // sql statement used to query deletes for the index
    // if the warehouse does not need to consider deletets, set this to null
    abstract deletesSql: string | null;


    // Stores date and time of the last time the function sync() was called,
    // marking the begin of the sync() process, which can be considerably earlier
    // than its end. It is null until sync() is called the first time.
    lastUpdateBegin?: Date;

    // True if sync() is running
    syncing = false;

    // True if running sync() should restart right after finishing
    restartSyncing = false;


    constructor(
        protected main: Warehouse,
        private listenTo: string[]
    ) {
        super()
    }

    /**
     * init idx
     */
    async initIdx() {
        await this.clearAll()
        await this.addPgListeners()
        const dbNow = await this.main.pgClient.query('SELECT now() as now');
        await this.sync(new Date(dbNow.rows?.[0]?.now))

    }

    async clearAll() {
        await this.index.clearIdx()
    }

    /**
     * Adds the postgres listener
     * @param listenTo
     */
    private async addPgListeners() {
        for (const eventName of this.listenTo) {
            await this.main.registerDbListener(eventName, (tmsp:Date) => this.sync(tmsp))
        }
    }

    /**
     *
     * @param tmsp the timestamp of oldes modification considered for syncing
     */
    async sync(tmsp: Date) {
        // const {syncing, restartSyncing, lastUpdateBegin} = this;
        // console.log('sync' + this.constructor.name, {syncing, restartSyncing, lastUpdateBegin})

        // If syncing is true, it sets restartSyncing to true and stops the function here
        if (this.syncing) {
            this.restartSyncing = true
            return;
        }

        // Else sets syncing to true and restartSyncing to false
        this.syncing = true;
        this.restartSyncing = false;

        // throttle sync process for 10 ms
        // await new Promise((res, rej) => { setTimeout(() => { res() }, 10) })

        // Look for updates since the date of this.lastUpdateBegin or 1970
        const calls = [
            this.manageUpdatesSince(this.lastUpdateBegin)
        ]

        // Look for deletes if
        // - there is a deleteSql and
        // - this data service has ever been synced
        if (this.deletesSql && this.lastUpdateBegin) {
            calls.push(this.manageDeletesSince(this.lastUpdateBegin, this.deletesSql))
        }

        // set this.lastUpdateBegin to current date
        this.lastUpdateBegin = tmsp

        // await the calls produced above
        await Promise.all(calls);

        this.syncing = false;
        if (this.restartSyncing) await this.sync(tmsp);
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

        const t1 = Logger.start(`${this.constructor.name} > manageUpdatesSince ${date}`, 1);
        const t2 = Logger.start(`Start update query  ...`, 2);
        const d = date ?? new Date(0);
        const query = new QueryStream(this.updatesSql, [d])

        const stream = this.main.pgClient.query(query)
        let minMeasure: number | null = null, maxMeasure: number | null = null;
        let i = 0;
        await new Promise((res, rej) => {

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
                res()
                // Logger.resetLine()
                if (minMeasure && maxMeasure) {
                    Logger.itTook(t4, `to put ${i} items to index of ${this.constructor.name}  –  fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 2);
                } else {
                    Logger.itTook(t4, `to put ${i} items to index of ${this.constructor.name}`, 2);
                }
            })


        })

        Logger.itTook(t1, `to manage ${i} updates by ${this.constructor.name}`, 1);



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
    private async manageDeletesSince(date: Date, deletesSql: string) {
        const t1 = Logger.start(`${this.constructor.name} > manageDeletesSince ${date}`, 1);
        const t2 = Logger.start(`Start deletes query  ...`, 2);
        const d = date ?? new Date(0);
        const query = new QueryStream(deletesSql, [d])

        const stream = this.main.pgClient.query(query)
        let minMeasure: number | null = null, maxMeasure: number | null = null;
        let i = 0;
        await new Promise((res, rej) => {

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
                res()
                // Logger.resetLine()
                if (minMeasure && maxMeasure) {
                    Logger.itTook(t4, `to delete ${i} items from index of ${this.constructor.name}  –  fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 2);
                } else {
                    Logger.itTook(t4, `to delete ${i} items from index of ${this.constructor.name}`, 2);
                }
            })


        })

        Logger.itTook(t1, `to manage ${i} deletes by ${this.constructor.name}`);

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
}
