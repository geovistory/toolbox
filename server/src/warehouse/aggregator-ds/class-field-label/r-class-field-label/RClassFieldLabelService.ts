import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {DfhPropertyLabelId, DfhPropertyLabelService, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {RPropertyService} from '../../../primary-ds/property/RPropertyService';
import {ProPropertyLabelId, ProPropertyLabelService, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
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
@Injectable()
export class RClassFieldLabelService extends AggregatedDataService2<RClassFieldId, RClassFieldVal>{
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
    depDfhPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, DfhPropertyLabelId, DfhPropertyLabelVal>
    depProPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, ProPropertyLabelId, ProPropertyLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => RPropertyService)) rProperty: RPropertyService,
        @Inject(forwardRef(() => DfhPropertyLabelService)) dfhPropertyLabel: DfhPropertyLabelService,
        @Inject(forwardRef(() => ProPropertyLabelService)) proPropertyLabel: ProPropertyLabelService

    ) {
        super(
            wh,
            rClassFieldKeyDef
        )

        this.registerCreatorDS(rProperty)
        this.depDfhPropertyLabel = this.addDepencency(dfhPropertyLabel)
        this.depProPropertyLabel = this.addDepencency(proPropertyLabel)

    }
    getDependencies() {
        return this
    };

}
