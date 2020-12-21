import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../base/classes/DependencyIndex';
import {RClassId, rClassIdKeyDefs} from '../../primary-ds/DfhClassHasTypePropertyService';
import {DfhOutgoingPropertyService, OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService';
import {Warehouse} from '../../Warehouse';
import {IdentifyingPropertyAggregator} from './IdentifyingPropertyAggregator';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';


export type IdentifyingPropertyVal = OutgoingPropertyVal[]

@Injectable()
export class IdentifyingPropertyService extends AggregatedDataService2<RClassId, IdentifyingPropertyVal>{


    aggregator = IdentifyingPropertyAggregator;
    providers = IdentifyingPropertyProviders;

    outgoingProperty: DependencyIndex<RClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => DfhOutgoingPropertyService)) dfhOutgoingProperty: DfhOutgoingPropertyService,
    ) {
        super(
            wh,
            rClassIdKeyDefs
        )
        this.registerCreatorDS({
            dataService: dfhOutgoingProperty,
            customSql: [{select: `"fkDomain" as "pkClass"`}]
        })
        this.outgoingProperty = this.addDepencency(dfhOutgoingProperty)
    }

    getDependencies() {
        return this
    };
}
