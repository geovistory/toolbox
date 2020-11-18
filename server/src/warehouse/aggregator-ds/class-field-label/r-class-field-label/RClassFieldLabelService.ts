import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {rClassFieldIdToString, stringToRClassFieldId} from '../../../base/functions';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {RPropertyService} from '../../../primary-ds/property/RPropertyService';
import {Warehouse} from '../../../Warehouse';
import {RClassFieldLabelAggregator} from './RClassFieldLabelAggregator';
import {RClassFieldLabelProviders} from './RClassFieldLabelProviders';

export interface RClassFieldId {
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}
export interface RClassFieldVal {
    label?: string
}
export const rClassFieldKeyDef: KeyDefinition[] = [
    {name: 'fkClass', type: 'integer'},
    {name: 'fkProperty', type: 'integer'},
    {name: 'isOutgoing', type: 'boolean'},
]
export class RClassFieldLabelService extends AggregatedDataService<RClassFieldId, RClassFieldVal>{
    creatorDS: RPropertyService
    aggregator = RClassFieldLabelAggregator;
    providers = RClassFieldLabelProviders;
    customCreatorDSSql = [
        {
            select: `"fkDomain" as "fkClass", "pkProperty" as "fkProperty", true as "isOutgoing"`,
        },
        {
            select: `"fkRange" as "fkClass", "pkProperty" as "fkProperty", false as "isOutgoing"`,
        }
    ]
    constructor(public wh: Warehouse) {
        super(
            wh,
            rClassFieldIdToString,
            stringToRClassFieldId,
            rClassFieldKeyDef
        )

        this.registerCreatorDS(this.wh.prim.rProperty)

    }
    getDependencies() {
        return this.wh.dep.rClassFieldLabel
    };

}
