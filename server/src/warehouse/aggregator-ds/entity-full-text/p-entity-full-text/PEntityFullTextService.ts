import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityFullTextAggregator} from './PEntityFullTextAggregator';
import {PEntityFullTextProviders} from './PEntityFullTextPoviders';
import {Injectable, Inject, forwardRef} from 'injection-js';

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
export class PEntityFullTextService extends AggregatedDataService<PEntityId, PEntityFullTextVal>{
    creatorDS: PEntityService
    aggregator = PEntityFullTextAggregator;
    providers = PEntityFullTextProviders;
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS(wh.prim.pEntity)
    }


    getDependencies() {
        return this.wh.dep.pEntityFullText
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

