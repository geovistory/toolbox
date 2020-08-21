import {IndexDB} from './IndexDB';
import {AggregatedDataService} from './AggregatedDataService';
import {DataService} from './DataService';
export interface DependencyMap {[key: string]: true}

class UniqIdx extends IndexDB<string, true> {
    keyToString(key: string) {return key}
    stringToKey(key: string) {return key}
}

const sep = ':'

export class DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel> {

    constructor(
        public receiverDS: AggregatedDataService<ReceiverKeyModel, ReceiverValModel, any>,
        public providerDS: DataService<ProviderKeyModel, ProviderValModel>,
        public receiverKeyToString: (key: ReceiverKeyModel) => string,
        public stringToReceiverKey: (str: string) => ReceiverKeyModel,
        public providerKeyToString: (key: ProviderKeyModel) => string,
        public stringToProviderKey: (str: string) => ProviderKeyModel,
    ) {
        providerDS.registerProviderOf(this)
    }


    // keys are of pattern `${receiverStr}:${providerStr}`, values = true
    receiverToProvider = new UniqIdx()

    // keys are of pattern ${receiverStr}:${providerStr}`, values = true
    providerToReceiver = new UniqIdx()


    async addProvider(receiver: ReceiverKeyModel, provider: ProviderKeyModel): Promise<void> {
        const receiverStr = this.receiverKeyToString(receiver)
        const providerStr = this.providerKeyToString(provider)

        await this.receiverToProvider.addToIdx(this.createReceiverToProviderStr(receiverStr, providerStr), true)
        await this.providerToReceiver.addToIdx(this.createProviderToReceiverStr(providerStr, receiverStr), true)
        return;
    }

    createReceiverToProviderStr(receiverStr: string, providerStr: string) {
        return `${receiverStr}${sep}${providerStr}`
    }

    createProviderToReceiverStr(providerStr: string, receiverStr: string) {
        return `${providerStr}${sep}${receiverStr}`
    }

    async getProviders(receiver: ReceiverKeyModel): Promise<ProviderKeyModel[]> {
        return new Promise((res, rej) => {
            const receiverStr = this.receiverKeyToString(receiver);
            const keys = this.receiverToProvider.db.createKeyStream(this.createStreamOptions(receiverStr))
            const batch: ProviderKeyModel[] = []
            keys.on('data', (key: string) => {
                const providerStr = key.split(sep)[1]
                batch.push(this.stringToProviderKey(providerStr))
            })
            keys.on('error', function (err: unknown) {
                rej(err)
            })
            keys.on('end', function () {
                res(batch)
            })
        })
    }

    /**
     * the returned receivers are depending on the provider.
     * In other words: the given provider is used/needed by the returned receivers
     * @param provider
     */
    async getReceivers(provider: ProviderKeyModel): Promise<ReceiverKeyModel[]> {
        return new Promise((res, rej) => {
            const providerStr = this.providerKeyToString(provider);
            const keys = this.providerToReceiver.db.createKeyStream(this.createStreamOptions(providerStr))
            const batch: ReceiverKeyModel[] = []
            keys.on('data', (key: string) => {
                const receiverStr = key.split(sep)[1]
                batch.push(this.stringToReceiverKey(receiverStr))
            })
            keys.on('error', function (err: unknown) {
                rej(err)
            })
            keys.on('end', function () {
                res(batch)
            })
        })
    }

    async getProviderMap(receiver: ReceiverKeyModel): Promise<DependencyMap> {
        return new Promise((res, rej) => {
            const receiverStr = this.receiverKeyToString(receiver);
            const keys = this.receiverToProvider.db.createKeyStream(this.createStreamOptions(receiverStr))
            const map: DependencyMap = {}
            keys.on('data', (key: string) => {
                const providerStr = key.split(sep)[1]
                map[providerStr] = true
            })
            keys.on('error', function (err: unknown) {
                rej(err)
            })
            keys.on('end', function () {
                res(map)
            })
        })
    }

    async removeProviderByString(receiverStr: string, providerStr: string): Promise<void> {
        await this.providerToReceiver.removeFromIdx(this.createProviderToReceiverStr(providerStr, receiverStr))
        await this.receiverToProvider.removeFromIdx(this.createReceiverToProviderStr(receiverStr, providerStr))
    }

    async removeProvider(receiver: ReceiverKeyModel, provider: ProviderKeyModel): Promise<void> {
        const receiverStr = this.receiverKeyToString(receiver)
        const providerStr = this.providerKeyToString(provider)

        await this.removeProviderByString(receiverStr, providerStr);
    }

    /**
     * remove all dependencies of receiver
     * keeps both directions in sync
     * @param receiver
     */
    async removeAllProviders(receiver: ReceiverKeyModel): Promise<void> {
        const dependencies = await this.getProviders(receiver)
        for (const provider of dependencies) {
            await this.removeProvider(receiver, provider)
        }
    }

    /**
     * Adds updated request for all receivers of the provider
     * @param provider key of the provider
     */
    addUpdateRequestToReceiversOf(provider: ProviderKeyModel) {
        return new Promise((res, rej) => {
            const providerStr = this.providerKeyToString(provider);
            const keys = this.providerToReceiver.db.createKeyStream(this.createStreamOptions(providerStr))
            keys.on('data', (key: string) => {
                const receiverStr = key.split(sep)[1]
                this.receiverDS.updater.addItemToQueue(this.stringToReceiverKey(receiverStr))
                    .catch(e => rej(e))
            })
            keys.on('error', function (err: unknown) {
                rej(err)
            })
            keys.on('end', function () {
                res()
            })
        })
    }


    async clearIdx(): Promise<void> {
        await this.providerToReceiver.clearIdx()
        await this.receiverToProvider.clearIdx()
    }

    /**
     * Returns an object for streaming keys that begin with the given string
     *
     * @param str beginning of the streamed keys
     *
     * Read more here:
     * https://github.com/Level/levelup/issues/285#issuecomment-57205251
     *
     * Read more about '!' and '~' here:
     * https://medium.com/@kevinsimper/how-to-get-range-of-keys-in-leveldb-and-how-gt-and-lt-works-29a8f1e11782
     * @param str
     */
    private createStreamOptions(str: string) {
        return {
            gte: str + '!',
            lte: str + '~'
        }
    }

}
