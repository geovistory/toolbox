import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
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
export class PEntityTypeService extends AggregatedDataService<PEntityId, PEntityTypeVal>{
    creatorDS: PEntityService
    aggregator = PEntityTypeAggregator;
    providers = PEntityTypeProviders;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pEntityKeyDefs
        )

        this.registerCreatorDS(this.wh.prim.pEntity)


    }

    getDependencies() {
        return this.wh.dep.pEntityType
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

