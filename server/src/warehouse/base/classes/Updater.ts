import {Logger} from './Logger';
import {AbstractAggregator} from './AbstractAggregator';
import {UniqIndexGeneric} from './UniqIndexGeneric';
import {StringToKeyModel} from '../interfaces/StringToKeyModel';
import {KeyModelToString} from '../interfaces/KeyModelToString';
import prettyms from 'pretty-ms';

export class Updater<KeyModel, Aggregator extends AbstractAggregator<KeyModel>> {
    cycleNr = 1;

    hot: 'A' | 'B' = 'A'

    _queueA: UniqIndexGeneric<KeyModel>
    _queueB: UniqIndexGeneric<KeyModel>

    // returns the index / db that is currently storing new pending requests
    get growingQueue() {
        return this.hot === 'A' ? this._queueA : this._queueB
    }

    // returns the index / db that is used by the cycle
    get shrinkingQueue() {
        return this.hot === 'A' ? this._queueB : this._queueA
    }

    // true during running update cycle
    updating = false;

    constructor(
        public name: string,
        private aggregatorFactory: (modelId: KeyModel) => Promise<Aggregator>,
        private register: (result: Aggregator) => Promise<void>,
        keyToString: KeyModelToString<KeyModel>,
        stringToKey: StringToKeyModel<KeyModel>,
        private registerAllHook?: (results: Aggregator[]) => void
    ) {

        this._queueA = new UniqIndexGeneric<KeyModel>(keyToString, stringToKey)
        this._queueB = new UniqIndexGeneric<KeyModel>(keyToString, stringToKey)
    }


    async addItemToQueue(id: KeyModel) {
        await this.growingQueue.addToIdx(id, true)

        // initialize new recursive update cycle
        if (this.updating === false
             && this.cycleNr > 1
        ) {
            setTimeout(() => {
                this.startCylcling().catch(e => {console.error(e)})
            }, 0)
        }
    }

    async addItemsToQueue(ids: KeyModel[]) {
        for (const entityId of ids) {
            await this.addItemToQueue(entityId)
        }
    }

    async removeItems(ids: KeyModel[]) {
        for (const entityId of ids) {
            await this.removeItem(entityId)
        }
    }

    private async removeItem(id: KeyModel) {
        await this.growingQueue.removeFromIdx(id)
    }


    /**
     * Start looping over the update queue.
     * May run multiple cycles.
     */
    async startCylcling() {
        this.updating = true

        const t0 = Logger.start(`${this.name} > Run recursive cycle ${this.cycleNr}`, 0)
        await this.runOneCycle();
        Logger.itTook(t0, `to run recursive cycle`, 0)
        this.updating = true


        const t1 = Logger.start(`get length of growingQueue`)
        const hotReqsLenght = await this.growingQueue.getLength()
        Logger.msg(`${hotReqsLenght} pending request remaining`)
        Logger.itTook(t1, `get length`)

        // - restart cicle, if pending

        if (hotReqsLenght > 0) {
            await this.startCylcling()
        }

        this.updating = false

    }


    // run one update cycle
    // TODO: implement this using streams instead of storing everythin in memory
    async runOneCycle() {
        this.updating = true
        const length = await this.growingQueue.getLength()
        const results: Aggregator[] = [];
        let i = 0
        const measure = 1000;
        let t = Logger.getTime()
        const t2 = Logger.getTime()

        let minMeasure: number | null = null, maxMeasure: number | null = null;

        // - switch the active index recieving new update requests during the cycle
        this.switchActivePendingIdx()

        // create aggregator for each item in shrinking queue
        await this.shrinkingQueue.forEachKey(async (entityId) => {

            const created = await this.aggregatorFactory(entityId)
            results.push(created);

            i++
            if (i % measure === 0) {
                // Logger.resetLine()
                const time = Logger.itTook(t, `to aggregate ${measure} items by ${this.name} – item ${i}/${length}`, 1)
                t = Logger.getTime()
                if (!minMeasure || minMeasure > time) minMeasure = time;
                if (!maxMeasure || maxMeasure < time) maxMeasure = time;
            }

            return;
        })

        // Logger.resetLine()
        if (minMeasure && maxMeasure) {
            const average = prettyms(Logger.diffMs(t2) / i)
            Logger.itTook(t2, `to aggregate ${i} items by ${this.constructor.name} – fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , average: \u{1b}[33m${average}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 1);
        } else {
            Logger.itTook(t2, `to aggregate ${i} items by ${this.constructor.name}`);
        }


        minMeasure = maxMeasure = null;

        // Register EntityPreview for each created preview
        i = 0;
        if (this.registerAllHook) this.registerAllHook(results)
        for (const result of results) {
            await this.register(result)

            i++
            if (i % measure === 0) {
                // Logger.resetLine()
                Logger.itTook(t, `to register ${measure} items by ${this.name} – item ${i}/${results.length}`, 1)
                t = Logger.getTime()
            }
            // await result.register();
        }
        // Logger.resetLine()
        if (minMeasure && maxMeasure) {
            const average = prettyms(Logger.diffMs(t2) / i)
            Logger.itTook(t2, `to register ${i} items by ${this.constructor.name} – fastest: \u{1b}[33m${prettyms(minMeasure)}\u{1b}[0m , average: \u{1b}[33m${average}\u{1b}[0m , slowest: \u{1b}[33m${prettyms(maxMeasure)}\u{1b}[0m`, 1);
        } else {
            Logger.itTook(t2, `to register ${i} items by ${this.constructor.name}`);
        }


        // clear the now consumed pending index
        await this.shrinkingQueue.clearIdx()

        this.cycleNr++
        this.updating = false
    }

    private switchActivePendingIdx() {
        this.hot = this.hot === 'A' ? 'B' : 'A';
    }

    async clearIdx() {
        this.cycleNr = 1;
        return Promise.all([
            this.shrinkingQueue.clearIdx(),
            this.growingQueue.clearIdx()
        ])
    }
}
