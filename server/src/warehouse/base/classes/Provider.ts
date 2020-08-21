import {DependencyIndex, DependencyMap} from './DependencyIndex';
import {omit} from 'ramda';
import {ProviderInterface} from '../interfaces/Providers';

export class Provider<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel> implements ProviderInterface<ReceiverKeyModel> {
    providerCache: DependencyMap = {};
    constructor(
        private dependencyIndex: DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel>,
        private receiverKey: ReceiverKeyModel
    ) {}
    async loadProvidersInCache(receiverKey: ReceiverKeyModel) {
        this.providerCache = await this.dependencyIndex.getProviderMap(receiverKey);
    }

    /**
     * gets value from providing DataService
     * removes the provider from cache
     * adds the provider to the dependency index
     */
    public async get(providerKey: ProviderKeyModel) {
        this.removeProviderFromCache(providerKey)
        const [providerVal] = await Promise.all([
            this.dependencyIndex.providerDS.index.getFromIdx(providerKey),
            this.addProviderToIndex(providerKey)
        ])
        return providerVal;
        // await this.addProviderToIndex(providerKey)
        // const providerVal = await this.dependencyIndex.providerIndex.getFromIdx(providerKey)
        // return providerVal;
    }
    public async removeCachedProvidersFromIndex() {
        const receiverStr = this.dependencyIndex.receiverKeyToString(this.receiverKey);
        for (const providerStr of Object.keys(this.providerCache)) {
            await this.dependencyIndex.removeProviderByString(receiverStr, providerStr);
        }
    }

    private removeProviderFromCache(providerKey: ProviderKeyModel) {
        this.providerCache = omit([this.dependencyIndex.providerKeyToString(providerKey)], this.providerCache)
    }
    private async addProviderToIndex(id: ProviderKeyModel) {
        await this.dependencyIndex.addProvider(this.receiverKey, id);
    }
}
