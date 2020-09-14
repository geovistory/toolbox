import {IndexDB} from './IndexDB';
import {DependencyIndex} from './DependencyIndex';
import {equals} from 'ramda';
import {Subject} from 'rxjs';
import {Logger} from './Logger';



export abstract class DataService<KeyModel, ValueModel>{

    abstract index: IndexDB<KeyModel, ValueModel>
    abstract clearAll(): Promise<void>

    // emits key value pair after it was put into this.index
    afterPut$: Subject<{key: KeyModel, val: ValueModel}>;

    // emits key after it was deleted from this.index
    // also in the case that there was nothing to delete
    afterDel$: Subject<KeyModel>;

    // array of dependency indexes where this data service is provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isProviderOf: DependencyIndex<any, any, KeyModel, ValueModel>[] = []

    constructor() {
        this.afterPut$ = new Subject<{key: KeyModel, val: ValueModel}>()
        this.afterDel$ = new Subject<KeyModel>()
    }

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
        this.afterDel$.next(key)
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
                    this.afterPut$.next({key, val})
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
    private addUpdateRequestsForReceivers(providerKey: KeyModel) {
        for (const dep of this.isProviderOf) {
            dep.addUpdateRequestToReceiversOf(providerKey).catch(e => Logger.err(e));
        }
    }
}
