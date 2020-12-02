import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityLabelConfigVal, ProEntityLabelConfigService} from '../../../primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../Warehouse';
import {IdentifyingPropertyService, IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {EntityLabelVal} from '../entity-label.commons';
import {PEntityLabelAggregator} from './PEntityLabelAggregator';
import {PEntityLabelProviders} from './PEntityLabelPoviders';

@Injectable()
export class PEntityLabelService extends AggregatedDataService2<PEntityId, EntityLabelVal>{
    creatorDS: PEntityService
    aggregator = PEntityLabelAggregator;
    providers = PEntityLabelProviders;

    depPEntity: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, PEntity>
    depProEntityLabelConfig: DependencyIndex<PEntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
    depIdentifyingProperty: DependencyIndex<PEntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    depPEntityLabel: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityFields>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => ProEntityLabelConfigService)) entityLabelConfig: ProEntityLabelConfigService,
        @Inject(forwardRef(() => IdentifyingPropertyService)) identifyingProperty: IdentifyingPropertyService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS(pEntity)
        this.depPEntity = this.addDepencency(pEntity);
        this.depProEntityLabelConfig = this.addDepencency(entityLabelConfig);
        this.depIdentifyingProperty = this.addDepencency(identifyingProperty);
        this.depPEntityLabel = this.addDepencency(this);
        this.depPEdge = this.addDepencency(pEdge);
    }
    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET entity_label = ${tableAlias}.val->>'entityLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND entity_label IS DISTINCT FROM ${tableAlias}.val->>'entityLabel'`
    }
}

