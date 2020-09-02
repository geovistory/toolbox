import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';
import {Updater} from '../../base/classes/Updater';
import {pEntityIdToString, stringToPEntityId} from '../../base/functions';
import {PEntityId} from '../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../Warehouse';
import {PEntityTimeSpanAggregator} from './PEntityTimeSpanAggregator';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';
import {EntityTimePrimitive} from "../../primary-ds/edge/edge.commons";

export type TimeSpanKeys =
    'p82'       // At some time within | outer bounds | not before – not after
    | 'p81'     // Ongoing throughout | inner bounds | surely from – surely to
    | 'p81a'    // end of the begin | left inner bound | surely from
    | 'p82a'    // begin of the begin | left outer bound | not before
    | 'p81b'    // begin of the end | right inner bound | surely to
    | 'p82b'    // end of the end | right outer bound | not after
export type PEntityTimeSpanVal = {
    timeSpan?: PEntityTimeSpan;
    firstSecond?: number
    lastSecond?: number
}
export type PEntityTimeSpan = {
    [key in TimeSpanKeys]?: EntityTimePrimitive;
}

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityTimeSpanVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityTimeSpanAggregator
 *
 */
export class PEntityTimeSpanService extends AggregatedDataService<PEntityId, PEntityTimeSpanVal, PEntityTimeSpanAggregator>{
    updater: Updater<PEntityId, PEntityTimeSpanAggregator>;

    index = new IndexDBGeneric<PEntityId, PEntityTimeSpanVal>(pEntityIdToString, stringToPEntityId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityTimeSpanProviders(this.wh.dep.pEntityTimeSpan, id)
            return new PEntityTimeSpanAggregator(providers, id).create()
        }
        const register = async (result: PEntityTimeSpanAggregator) => {
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
            pEntityIdToString,
            stringToPEntityId,
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, PEntityTimeSpanVal>(
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
            (item) => [item.key.pkEntity, item.key.fkProject, item.val.timeSpan, item.val.firstSecond, item.val.lastSecond],
            pEntityIdToString
        )

        /**
         * Add actions after a new class type is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }

    // writeToDb(results: PEntityTimeSpanAggregator[]) {
    //     let i = 0;
    //     let batchSize = 0;
    //     const maxBatchSize = 1000;
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     let params: any[] = []
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const addParam = (val: any) => {
    //         params.push(val)
    //         return '$' + params.length;
    //     }
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const addParams = (vals: any[]) => {
    //         return vals.map(val => addParam(val)).join(',');
    //     }
    //     let values = ''
    //     let remaining = results.length;


    //     for (const res of results) {
    //         const arr = this.getParamsForUpsert(res)
    //         values = values + `(${addParams(arr)}),`
    //         i++
    //         batchSize++
    //         if (i % maxBatchSize === 0 || i === results.length) {
    //             remaining = remaining - batchSize;
    //             const t = Logger.start(`Upserting ${batchSize} entity labels, remaining: ${remaining} of ${results.length}`, 2)
    //             const q = this.getUpsertSql(values.slice(0, -1))
    //             this.wh.pgClient.query(q, params)
    //                 .then(() => {
    //                     Logger.itTook(t, `to batch upsert entity labels`, 2)
    //                 })
    //                 .catch(e => {
    //                     console.log(e)
    //                 })

    //             params = []
    //             values = ''
    //             batchSize = 0;
    //         }
    //     }
    // }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // getParamsForUpsert(res: PEntityTimeSpanAggregator): any[] {
    //     return [res.id.pkEntity, res.id.fkProject, res.id.fkProject, res.entityType]
    // }

    // getUpsertSql(valuesStr: string) {
    //     return `
    //     INSERT INTO war.entity_preview (pk_entity, fk_project, project, entity_label)
    //     VALUES ${valuesStr}
    //     ON CONFLICT (pk_entity, project) DO UPDATE
    //     SET entity_label = EXCLUDED.entity_label
    //     WHERE EXCLUDED.entity_label IS DISTINCT FROM war.entity_preview.entity_label;`
    // }
}

