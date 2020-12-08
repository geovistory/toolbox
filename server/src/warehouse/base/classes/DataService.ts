import {values} from 'ramda';
import {Subject} from 'rxjs';
import {AggregatedDataService} from './AggregatedDataService';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DependencyIndex} from './DependencyIndex';
import {Warehouse} from '../../Warehouse';



export abstract class DataService<KeyModel, ValueModel>{

    abstract index: DataIndexPostgres<KeyModel, ValueModel>
    abstract clearAll(): Promise<void>

    afterChange$ = new Subject<void>()

    // array of dependency indexes where this data service is provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isProviderOf: DependencyIndex<any, any, KeyModel, ValueModel>[] = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isCreatorOf: AggregatedDataService<KeyModel, any>[] = []


    constructor(wh: Warehouse) {

        this.afterChange$
            // .pipe(throttleTime(10)) TODO: Test if this helps!
            .subscribe(_ => {
                // do not propagate updates, if warehouse is initalizing primary data services
                if (wh.preventPropagation === false) {
                    this.propagateUpdates().catch(e => console.log(e));
                }
            })

    }


    private async propagateUpdates() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const toInform: {[key: string]: AggregatedDataService<any, any>;} = {};

        // add receiver DataServices
        for (const depIdx of this.isProviderOf) {
            toInform[depIdx.receiverDS.constructor.name] = depIdx.receiverDS;
        }
        // add created DataServices
        for (const createdDs of this.isCreatorOf) {
            toInform[createdDs.constructor.name] = createdDs;
        }
        const ds = values(toInform)
        if (ds.length) {
            const wh = ds[0].wh
            const currentTime = await wh.pgNow()

            // useful for debugging
            if (ds.some(d => d.constructor.name === 'PEntityTypeService')) {
                console.log(`-> propagate changes from ${this.constructor.name} to PEntityTypeService: ${currentTime}`)
            }

            // propagate updates
            const updates = ds.map(d => d.doUpdate(currentTime));

            // wait until all aggregated DS have handled updates
            await Promise.all(updates)

            // useful for debugging
            if (this.constructor.name === 'PEntityLabelService') {
                console.log(`---> cleanup items marked as deleted bevore or eq: ${currentTime}`)
            }

            // cleanup items marked as deleted
            this.index.removeFromIdxWhereDeletedBefore(currentTime)
                .catch(e => console.log(e))
        }
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
     * Adds AggregatedDataService to the array of dataservices that should
     * have one aggregated item for each item in this DataService.
     * @param createdDS
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerIsCreatorOf(createdDS: AggregatedDataService<KeyModel, any>) {
        this.isCreatorOf.push(createdDS)
    }





}
