import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldsConfigService, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../Warehouse';
import {PClassFieldLabelId, PClassFieldLabelService, PClassFieldLabelVal} from '../../class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelService, PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityLabelService} from '../../entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {PEntityFullTextAggregator} from './PEntityFullTextAggregator';
import {PEntityFullTextProviders} from './PEntityFullTextPoviders';

export interface PEntityFullTextVal {fullText?: string};

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityFullTextVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityFullTextAggregator
 *
 */
@Injectable()
export class PEntityFullTextService extends AggregatedDataService2<PEntityId, PEntityFullTextVal>{
    creatorDS: PEntityService
    aggregator = PEntityFullTextAggregator;
    providers = PEntityFullTextProviders;
    depPEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, PEntity>
    depPEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityLabelVal>
    depREntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, REntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    depPClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, PClassLabelVal>
    depPClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>
    depPClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldLabelId, PClassFieldLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEntityLabelService)) pEntityLabel: PEntityLabelService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
        @Inject(forwardRef(() => PClassLabelService)) pClassLabel: PClassLabelService,
        @Inject(forwardRef(() => ProClassFieldsConfigService)) pClassFields: ProClassFieldsConfigService,
        @Inject(forwardRef(() => PClassFieldLabelService)) pClassFieldLabel: PClassFieldLabelService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS(pEntity)

        this.depPEntity = this.addDepencency(pEntity);
        this.depPEntityLabel = this.addDepencency(pEntityLabel);
        this.depREntityLabel = this.addDepencency(rEntityLabel);
        this.depPEdge = this.addDepencency(pEdge);
        this.depPClassLabel = this.addDepencency(pClassLabel);
        this.depPClassFields = this.addDepencency(pClassFields);
        this.depPClassFieldLabel = this.addDepencency(pClassFieldLabel);
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
        AND project = ${tableAlias}."fkProject"
        AND full_text IS DISTINCT FROM ${tableAlias}.val->>'fullText'`
    }
}

