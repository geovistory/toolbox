import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {PClassService} from '../../../primary-ds/class/PClassService';
import {DfhClassLabelId, DfhClassLabelService, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {PClassId, pClassIdKeyDef} from '../../../primary-ds/ProClassFieldsConfigService';
import {ProClassLabelId, ProClassLabelService, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {ProjectId, ProjectVal, ProProjectService} from '../../../primary-ds/ProProjectService';
import {Warehouse} from '../../../Warehouse';
import {PClassLabelAggregator} from './PClassLabelAggregator';
import {PClassLabelProviders} from './PClassLabelProviders';

export interface PClassLabelVal {label?: string}
@Injectable()
export class PClassLabelService extends AggregatedDataService2<PClassId, PClassLabelVal>{
    creatorDS: PClassService
    aggregator = PClassLabelAggregator;
    providers = PClassLabelProviders;
    depProProject: DependencyIndex<PClassId, PClassLabelVal, ProjectId, ProjectVal>
    depDfhClassLabel: DependencyIndex<PClassId, PClassLabelVal, DfhClassLabelId, DfhClassLabelVal>
    depProClassLabel: DependencyIndex<PClassId, PClassLabelVal, ProClassLabelId, ProClassLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PClassService)) pClass: PClassService,
        @Inject(forwardRef(() => ProProjectService)) proProject: ProProjectService,
        @Inject(forwardRef(() => DfhClassLabelService)) dfhClassLabel: DfhClassLabelService,
        @Inject(forwardRef(() => ProClassLabelService)) proClassLabel: ProClassLabelService) {
        super(
            wh,
            pClassIdKeyDef
        )
        this.registerCreatorDS(pClass);
        this.depProProject = this.addDepencency(proProject)
        this.depDfhClassLabel = this.addDepencency(dfhClassLabel)
        this.depProClassLabel = this.addDepencency(proClassLabel)

    }
    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT "pkClass", "fkProject", val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }

}
