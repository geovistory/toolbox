import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {pClassFieldIdToString, stringToPClassFieldId} from '../../../base/functions';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {PPropertyService} from '../../../primary-ds/property/PPropertyService';
import {Warehouse} from '../../../Warehouse';
import {PClassFieldLabelAggregator} from './PClassFieldLabelAggregator';
import {PClassFieldLabelProviders} from './PClassFieldLabelProviders';

export interface PClassFieldLabelId {
    fkProject: number,
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}
export interface PClassFieldLabelVal {
    label?: string
}
export const pClassFieldKeyDef: KeyDefinition[] = [
    {name: 'fkProject', type: 'integer'},
    {name: 'fkClass', type: 'integer'},
    {name: 'fkProperty', type: 'integer'},
    {name: 'isOutgoing', type: 'boolean'},
]
export class PClassFieldLabelService extends AggregatedDataService<PClassFieldLabelId, PClassFieldLabelVal>{
    creatorDS: PPropertyService
    aggregator = PClassFieldLabelAggregator;
    providers = PClassFieldLabelProviders;
    customCreatorDSSql = [
        {
            select: `"fkProject" as "fkProject", "fkDomain" as "fkClass", "pkProperty" as "fkProperty", true as "isOutgoing"`,
        },
        {
            select: `"fkProject" as "fkProject", "fkRange" as "fkClass", "pkProperty" as "fkProperty", false as "isOutgoing"`,
        }
    ]
    constructor(public wh: Warehouse) {
        super(
            wh,
            pClassFieldIdToString,
            stringToPClassFieldId,
            pClassFieldKeyDef
        )

        this.registerCreatorDS(this.wh.prim.pProperty)
    }

    getDependencies() {
        return this.wh.dep.pClassFieldLabel
    };

}
