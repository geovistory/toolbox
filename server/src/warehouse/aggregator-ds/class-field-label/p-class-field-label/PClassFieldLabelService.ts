import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {DfhPropertyLabelId, DfhPropertyLabelService, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {PPropertyService} from '../../../primary-ds/property/PPropertyService';
import {ProjectId, ProjectVal, ProProjectService} from '../../../primary-ds/ProProjectService';
import {ProPropertyLabelId, ProPropertyLabelService, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
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
@Injectable()
export class PClassFieldLabelService extends AggregatedDataService2<PClassFieldLabelId, PClassFieldLabelVal>{
    aggregator = PClassFieldLabelAggregator;
    providers = PClassFieldLabelProviders;
    depProject: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProjectId, ProjectVal>
    depDfhPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, DfhPropertyLabelId, DfhPropertyLabelVal>
    depPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProPropertyLabelId, ProPropertyLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PPropertyService)) pProperty: PPropertyService,
        @Inject(forwardRef(() => ProProjectService)) proProject: ProProjectService,
        @Inject(forwardRef(() => DfhPropertyLabelService)) dfhPropertyLabel: DfhPropertyLabelService,
        @Inject(forwardRef(() => ProPropertyLabelService)) proPropertyLabel: ProPropertyLabelService,
    ) {
        super(
            wh,
            pClassFieldKeyDef
        )

        this.registerCreatorDS({
            dataService: pProperty,
            customSql: [
                {
                    select: `"fkProject" as "fkProject", "fkDomain" as "fkClass", "pkProperty" as "fkProperty", true as "isOutgoing"`,
                },
                {
                    select: `"fkProject" as "fkProject", "fkRange" as "fkClass", "pkProperty" as "fkProperty", false as "isOutgoing"`,
                }
            ]
        })
        this.depProject = this.addDepencency(proProject)
        this.depDfhPropertyLabel = this.addDepencency(dfhPropertyLabel)
        this.depPropertyLabel = this.addDepencency(proPropertyLabel)
    }

    getDependencies() {
        return this
    };

}
