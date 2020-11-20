import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {rEntityIdToString, stringToREntityId} from '../../../base/functions';
import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
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
export class REntityFullTextService extends AggregatedDataService<REntityId, REntityFullTextVal>{
    creatorDS: REntityService
    aggregator = REntityFullTextAggregator;
    providers = REntityFullTextProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityIdToString,
            stringToREntityId,
            rEntityKeyDefs
        )
        this.registerCreatorDS(wh.prim.rEntity)
    }


    getDependencies() {
        return this.wh.dep.rEntityFullText
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

