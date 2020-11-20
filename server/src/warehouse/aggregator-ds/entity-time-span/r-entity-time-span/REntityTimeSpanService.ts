import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {rEntityIdToString, stringToREntityId} from '../../../base/functions';
import {EntityTimePrimitive} from "../../../primary-ds/edge/edge.commons";
import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {REntityTimeSpanAggregator} from './REntityTimeSpanAggregator';
import {REntityTimeSpanProviders} from './REntityTimeSpanPoviders';

export type TimeSpanKeys =
    'p82'       // At some time within | outer bounds | not before – not after
    | 'p81'     // Ongoing throughout | inner bounds | surely from – surely to
    | 'p81a'    // end of the begin | left inner bound | surely from
    | 'p82a'    // begin of the begin | left outer bound | not before
    | 'p81b'    // begin of the end | right inner bound | surely to
    | 'p82b'    // end of the end | right outer bound | not after
export type REntityTimeSpanVal = {
    timeSpan?: REntityTimeSpan;
    firstSecond?: number
    lastSecond?: number
}
export type REntityTimeSpan = {
    [key in TimeSpanKeys]?: EntityTimePrimitive;
}

/**
 * This Data Service manages the key-value store containing
 * as a key the REntityId (pkEntity and fkProject)
 * and as value the REntityTimeSpanVal (fkType, typeLabel)
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
 * -> The Val is the result of the REntityTimeSpanAggregator
 *
 */
export class REntityTimeSpanService extends AggregatedDataService<REntityId, REntityTimeSpanVal>{
    creatorDS: REntityService
    aggregator = REntityTimeSpanAggregator;
    providers = REntityTimeSpanProviders;
    customCreatorDSSql = [
        {
            where: `val->>'entityType' = 'teEn'`,
        }
    ]
    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityIdToString,
            stringToREntityId,
            rEntityKeyDefs
        )
        this.registerCreatorDS(this.wh.prim.rEntity)

    }
    getDependencies() {
        return this.wh.dep.rEntityTimeSpan
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET time_span = (${tableAlias}.val->>'timeSpan')::jsonb,
            first_second = (${tableAlias}.val->>'firstSecond')::bigint,
            last_second = (${tableAlias}.val->>'lastSecond')::bigint
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = 0
        AND (
            time_span,
            first_second,
            last_second
        )
        IS DISTINCT FROM
        (
            (${tableAlias}.val->>'timeSpan')::jsonb,
            (${tableAlias}.val->>'firstSecond')::bigint,
            (${tableAlias}.val->>'lastSecond')::bigint
        )`
    }
}

