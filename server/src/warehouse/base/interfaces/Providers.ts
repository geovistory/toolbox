import {DependencyIndex} from '../classes/DependencyIndex';
import {Provider} from '../classes/Provider';

export interface ProviderInterface<ReceiverKeyModel> {
    loadProvidersInCache(receiverKey: ReceiverKeyModel): Promise<void>
    removeCachedProvidersFromIndex(): Promise<void>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

export abstract class Providers<ReceiverKeyModel> {

    protected abstract receiverKey: ReceiverKeyModel;

    private providers: ProviderInterface<ReceiverKeyModel>[] = []

    registerProvider<ReceiverValModel, ProviderKeyModel, ProviderValModel>(
        dependencyIndex: DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel>,
        receiverKey: ReceiverKeyModel) {
        const p = new Provider(dependencyIndex, receiverKey)
        this.providers.push(p)
        return p
    }

    async load() {
        await Promise.all(
            this.providers.map(p => p.loadProvidersInCache(this.receiverKey))
        )
    }
    async removeProvidersFromIndexes() {
        await Promise.all(
            this.providers.map(p => p.removeCachedProvidersFromIndex())
        )
    }

}
