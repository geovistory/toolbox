import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {RClassId, rClassIdKeyDefs} from '../../primary-ds/DfhClassHasTypePropertyService';
import {DfhOutgoingPropertyService, OutgoingPropertyVal} from '../../primary-ds/DfhOutgoingPropertyService';
import {Warehouse} from '../../Warehouse';
import {IdentifyingPropertyAggregator} from './IdentifyingPropertyAggregator';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';


export type IdentifyingPropertyVal = OutgoingPropertyVal[]

export class IdentifyingPropertyService extends AggregatedDataService<RClassId, IdentifyingPropertyVal>{
    creatorDS: DfhOutgoingPropertyService
    customCreatorDSSql = [{select: `"fkDomain" as "pkClass"`}]

    aggregator = IdentifyingPropertyAggregator;
    providers = IdentifyingPropertyProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rClassIdKeyDefs
        )
        this.registerCreatorDS(this.wh.prim.dfhOutgoingProperty)
    }
    getDependencies() {
        return this.wh.dep.identifyingProperty
    };

}
