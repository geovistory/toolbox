import { IndexDB } from './IndexDB';
import { DependencyIndex } from './DependencyIndex';
import { equals } from 'ramda';



export abstract class DataService<KeyModel, ValueModel>{

    abstract index: IndexDB<KeyModel, ValueModel>
    abstract clearAll(): Promise<void>

    // array of dependency indexes where this data service is provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isProviderOf: DependencyIndex<any, any, KeyModel, ValueModel>[] = []

    /**
     * Adds dep to this.isProviderOf with the effect that this DataService acts
     * as the provider of data for dep. This is useful to inform the receiver
     * of the registered dep to perform updates, when the index of this
     * DataService is modified (put / del).
     * @param dep
     */
    registerProviderOf<ReceiverKeyModel, ReceiverValModel>(dep: DependencyIndex<ReceiverKeyModel, ReceiverValModel, KeyModel, ValueModel>) {
        this.isProviderOf.push(dep)
    }

    /**
     * Deletes key from index.
     * Adds update requesty accordingly.
     */
    async del(key: KeyModel) {

        // add update requests in syncronous way (do not await!)
        this.addUpdateRequestsForReceivers(key);

        await this.index.removeFromIdx(key)
    }



    /**
     * Puts key value pair to index.
     * Adds update requesty accordingly.
     */
    async put(key: KeyModel, val: ValueModel) {

        // check if val differs from old val in syncronous way (do not wait)!
        this.index.getFromIdx(key)
            .then(oldVal => {
                if (!equals(val, oldVal)) {
                    this.addUpdateRequestsForReceivers(key);
                }
            })
            .catch(e => console.error(e))

        await this.index.addToIdx(key, val)
    }



    /**
     * Add update requests for all receivers of the provided key.
     *
     * This happens in syncronous way (does not await)!
     */
    private addUpdateRequestsForReceivers(key: KeyModel) {
        for (const dep of this.isProviderOf) {
            dep.addUpdateRequestToReceiversOf(key).catch(e => console.error(e));
        }
    }
}
