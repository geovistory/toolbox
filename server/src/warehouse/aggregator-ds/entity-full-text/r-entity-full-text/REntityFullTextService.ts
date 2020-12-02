import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {REdgeService} from '../../../primary-ds/edge/REdgeService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldsConfigService, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../Warehouse';
import {RClassFieldId, RClassFieldLabelService, RClassFieldVal} from '../../class-field-label/r-class-field-label/RClassFieldLabelService';
import {RClassLabelService, RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {REntityFullTextAggregator} from './REntityFullTextAggregator';
import {REntityFullTextProviders} from './REntityFullTextPoviders';

export interface REntityFullTextVal {fullText?: string};

/**
 * This Data Service manages the key-value store containing
 * as a key the REntityId (pkEntity and fkProject)
 * and as value the REntityFullTextVal (fkType, typeLabel)
 *
 * One example key-value pair in the this.index is:
 * Key for the Project Entity Geo. Place 'Madrid' with pkEntity = 2002 in fkProject = 3001
 *  - '2002_3001'
 *
 * Val for the Geo. Place Type 'City' with pkEntity = 2003 in fkProject = 3001
 *  - fkType: 2003
 *  - typeLabel: 'Citiy'
 *
 *
 *
 * -> The Val is the result of the REntityFullTextAggregator
 *
 */
@Injectable()
export class REntityFullTextService extends AggregatedDataService2<REntityId, REntityFullTextVal>{
    creatorDS: REntityService
    aggregator = REntityFullTextAggregator;
    providers = REntityFullTextProviders;
    depREntity: DependencyIndex<REntityId, REntityFullTextVal, REntityId, REntity>
    depREntityLabel: DependencyIndex<REntityId, REntityFullTextVal, REntityId, EntityLabelVal>
    depREdge: DependencyIndex<REntityId, REntityFullTextVal, REntityId, EntityFields>
    depRClassLabel: DependencyIndex<REntityId, REntityFullTextVal, RClassId, RClassLabelValue>
    depRClassFieldLabel: DependencyIndex<REntityId, REntityFullTextVal, RClassFieldId, RClassFieldVal>
    depPClassFields: DependencyIndex<REntityId, REntityFullTextVal, PClassId, ProClassFieldVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => REdgeService)) rEdge: REdgeService,
        @Inject(forwardRef(() => RClassLabelService)) rClassLabel: RClassLabelService,
        @Inject(forwardRef(() => RClassFieldLabelService)) rClassFieldLabel: RClassFieldLabelService,
        @Inject(forwardRef(() => ProClassFieldsConfigService)) pClassFields: ProClassFieldsConfigService,
    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS(rEntity)

        this.depREntity = this.addDepencency(rEntity);
        this.depREntityLabel = this.addDepencency(rEntityLabel);
        this.depREdge = this.addDepencency(rEdge);
        this.depRClassLabel = this.addDepencency(rClassLabel);
        this.depRClassFieldLabel = this.addDepencency(rClassFieldLabel);
        this.depPClassFields = this.addDepencency(pClassFields);
    }


    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET full_text = ${tableAlias}.val->>'fullText'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = 0
        AND full_text IS DISTINCT FROM ${tableAlias}.val->>'fullText'`
    }

}

