import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
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
export class REntityTypeService extends AggregatedDataService<REntityId, REntityTypeVal>{
    creatorDS: REntityService
    aggregator = REntityTypeAggregator;
    providers = REntityTypeProviders;

    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS(this.wh.prim.rEntity)

    }

    getDependencies() {
        return this.wh.dep.rEntityType
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


