import {DependencyIndex} from './DependencyIndex';

export class Provider<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel>  {


    constructor(
        private dependencyIndex: DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel>,
        private receiverKey: ReceiverKeyModel
    ) { }

    /**
     * Gets array of items where the some of the provider key colums match the given
     * partialKey.
     *
     * @param partialKey
     */
    async getItemsWith(partialKey: Partial<ProviderKeyModel>): Promise<{key: ProviderKeyModel, value: ProviderValModel}[]> {
        const batch: {key: ProviderKeyModel, value: ProviderValModel}[] = []
        await this.dependencyIndex.providerDS.index.forEachItemWith(partialKey, async (item) => {
            this.dependencyIndex.cacheNewDependencies(this.receiverKey, item.key);
            batch.push(item)
        })
        return batch
    }
    /**
     * gets value from providing DataService
     * adds the provider to the dependency index
     */
    public async get(providerKey: ProviderKeyModel) {
        this.dependencyIndex.cacheNewDependencies(this.receiverKey, providerKey);
        return this.dependencyIndex.providerDS.index.getFromIdx(providerKey)

    }

}
