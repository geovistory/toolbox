import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../Warehouse';
import {PClassLabelService, PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';

export interface PEntityClassLabelVal {entityClassLabel: string}
@Injectable()
export class PEntityClassLabelService extends AggregatedDataService2<PEntityId, PEntityClassLabelVal>{
    creatorDS: PEntityService
    aggregator = PEntityClassLabelAggregator;
    providers = PEntityClassLabelProviders;
    depEntity: DependencyIndex<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>
    depPClassLabel: DependencyIndex<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PClassLabelService)) pClassLabel: PClassLabelService
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS(pEntity)
        this.depEntity = this.addDepencency(pEntity)
        this.depPClassLabel = this.addDepencency(pClassLabel)
    }

    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET class_label = ${tableAlias}.val->>'entityClassLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND class_label IS DISTINCT FROM ${tableAlias}.val->>'entityClassLabel'`
    }
}

