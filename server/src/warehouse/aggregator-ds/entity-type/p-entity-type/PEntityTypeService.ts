import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {DfhClassHasTypePropertyService, DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityLabelService} from '../../entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {PEntityTypeAggregator} from './PEntityTypeAggregator';
import {PEntityTypeProviders} from './PEntityTypePoviders';

export interface PEntityTypeVal {
    fkType?: number,
    typeLabel?: string
}

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityTypeVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityTypeAggregator
 *
 */
@Injectable()
export class PEntityTypeService extends AggregatedDataService2<PEntityId, PEntityTypeVal>{
    creatorDS: PEntityService
    aggregator = PEntityTypeAggregator;
    providers = PEntityTypeProviders;

    depPEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, PEntity>
    depPEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>
    depREntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityFields>
    depDfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEntityLabelService)) pEntityLabel: PEntityLabelService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
        @Inject(forwardRef(() => DfhClassHasTypePropertyService)) dfhClassHasTypeProp: DfhClassHasTypePropertyService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )

        this.registerCreatorDS(pEntity)
        this.depPEntity = this.addDepencency(pEntity)
        this.depPEntityLabel = this.addDepencency(pEntityLabel)
        this.depREntityLabel = this.addDepencency(rEntityLabel)
        this.depPEdge = this.addDepencency(pEdge)
        this.depDfhClassHasTypeProp = this.addDepencency(dfhClassHasTypeProp)

    }

    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET type_label = ${tableAlias}.val->>'typeLabel',
        fk_type = (${tableAlias}.val->>'fkType')::int
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND (
            type_label IS DISTINCT FROM ${tableAlias}.val->>'typeLabel'
            OR
            fk_type IS DISTINCT FROM (${tableAlias}.val->>'fkType')::int
        )`
    }
}

