import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {rEntityIdToString, stringToREntityId} from '../../../base/functions';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {REntityTimeSpanAggregator} from './REntityTimeSpanAggregator';
import {REntityTimeSpanProviders} from './REntityTimeSpanPoviders';
import {EntityTimePrimitive} from "../../../primary-ds/edge/edge.commons";

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
export class REntityTimeSpanService extends AggregatedDataService<REntityId, REntityTimeSpanVal, REntityTimeSpanAggregator>{
    updater: Updater<REntityId, REntityTimeSpanAggregator>;

    index = new IndexDBGeneric<REntityId, REntityTimeSpanVal>(rEntityIdToString, stringToREntityId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: REntityId) => {
            const providers = new REntityTimeSpanProviders(this.wh.dep.rEntityTimeSpan, id)
            return new REntityTimeSpanAggregator(providers, id).create()
        }
        const register = async (result: REntityTimeSpanAggregator) => {
            await this.put(result.id, {
                timeSpan: result.entityTimeSpan,
                firstSecond: result.firstSecond,
                lastSecond: result.lastSecond
            })
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            rEntityIdToString,
            stringToREntityId,
        )

        const upsertQueue = new SqlUpsertQueue<REntityId, REntityTimeSpanVal>(
            wh,
            'war.entity_preview (time_span)',
            (valuesStr: string) => `
            UPDATE war.entity_preview
            SET time_span = x.column3::jsonb,
                first_second = x.column4::bigint,
                last_second = x.column5::bigint
            FROM
            (
                values ${valuesStr}
            ) as x
            WHERE pk_entity = x.column1::int
            AND project = x.column2::int
            AND time_span IS DISTINCT FROM x.column3::jsonb;`,
            (item) => [item.key.pkEntity, 0, item.val.timeSpan, item.val.firstSecond, item.val.lastSecond],
            rEntityIdToString
        )

        /**
         * Add actions after a new class type is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }
}

