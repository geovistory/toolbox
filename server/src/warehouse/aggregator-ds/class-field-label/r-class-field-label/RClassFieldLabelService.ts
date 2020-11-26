import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {RPropertyService} from '../../../primary-ds/property/RPropertyService';
import {Warehouse} from '../../../Warehouse';
import {RClassFieldLabelAggregator} from './RClassFieldLabelAggregator';
import {RClassFieldLabelProviders} from './RClassFieldLabelProviders';
import {Injectable, Inject, forwardRef} from 'injection-js';

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
@Injectable()
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
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            rClassFieldKeyDef
        )

        this.registerCreatorDS(this.wh.prim.rProperty)

    }
    getDependencies() {
        return this.wh.dep.rClassFieldLabel
    };

}
