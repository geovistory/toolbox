import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {DfhClassHasTypePropertyService, DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {REdgeService} from '../../../primary-ds/edge/REdgeService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {REntityTypeAggregator} from './REntityTypeAggregator';
import {REntityTypeProviders} from './REntityTypePoviders';

export interface REntityTypeVal {
    fkType?: number,
    typeLabel?: string
}

/**
 * This Data Service manages the key-value store containing
 * as a key the REntityId (pkEntity and fkProject)
 * and as value the REntityTypeVal (fkType, typeLabel)
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
 * -> The Val is the result of the REntityTypeAggregator
 *
 */
@Injectable()
export class REntityTypeService extends AggregatedDataService2<REntityId, REntityTypeVal>{
    creatorDS: REntityService
    aggregator = REntityTypeAggregator;
    providers = REntityTypeProviders;

    depREntity: DependencyIndex<REntityId, REntityTypeVal, REntityId, REntity>
    depREntityLabel: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityLabelVal>
    depREdge: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityFields>
    depDfhClassHasTypeProp: DependencyIndex<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => REdgeService)) rEdge: REdgeService,
        @Inject(forwardRef(() => DfhClassHasTypePropertyService)) dfhClassHasTypeProp: DfhClassHasTypePropertyService,

    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS(rEntity)
        this.depREntity=this.addDepencency(rEntity);
        this.depREntityLabel=this.addDepencency(rEntityLabel);
        this.depREdge=this.addDepencency(rEdge);
        this.depDfhClassHasTypeProp=this.addDepencency(dfhClassHasTypeProp);
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
        AND project = 0
        AND (
            type_label IS DISTINCT FROM ${tableAlias}.val->>'typeLabel'
            OR
            fk_type IS DISTINCT FROM (${tableAlias}.val->>'fkType')::int
        )`
    }
}


