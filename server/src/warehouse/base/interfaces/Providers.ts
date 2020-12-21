import {DependencyIndex} from '../classes/DependencyIndex';
import {Provider} from '../classes/Provider';

export abstract class Providers<ReceiverKeyModel> {

    protected abstract receiverKey: ReceiverKeyModel;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private providers: Provider<ReceiverKeyModel, any, any, any>[] = []

    registerProvider<ReceiverValModel, ProviderKeyModel, ProviderValModel>(
        dependencyIndex: DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel>,
        receiverKey: ReceiverKeyModel) {
        const p = new Provider(dependencyIndex, receiverKey)
        this.providers.push(p)
        return p
    }


}
