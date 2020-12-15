import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {EntityFields, EntityTimePrimitive} from "../../../primary-ds/edge/edge.commons";
import {REdgeService} from '../../../primary-ds/edge/REdgeService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
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
@Injectable()
export class REntityTimeSpanService extends AggregatedDataService2<REntityId, REntityTimeSpanVal>{
    aggregator = REntityTimeSpanAggregator;
    providers = REntityTimeSpanProviders;

    depREntity: DependencyIndex<REntityId, REntityTimeSpanVal, REntityId, REntity>
    depREdge: DependencyIndex<REntityId, REntityTimeSpanVal, REntityId, EntityFields>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => REdgeService)) rEdge: REdgeService
    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS({
            dataService: rEntity,
            customSql: [
                {
                    where: `val->>'entityType' = 'teEn'`,
                }
            ]
        })
        this.depREntity = this.addDepencency(rEntity);
        this.depREdge = this.addDepencency(rEdge);
    }

    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const pentity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depREntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })
        await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depREdge,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
            },
            conditionTrueIf: {},
            createAggregationVal: {
                upsert: true,
                sql: () => `
                    jsonb_strip_nulls(jsonb_build_object(
                        'timeSpan', json_strip_nulls(json_build_object(
                            'p81', CASE WHEN t2.val->'outgoing'->'71' IS NOT NULL THEN json_build_object(
                                    'julianDay', t2.val->'outgoing'->'71'->0->'targetValue'->'timePrimitive'->'julianDay',
                                    'duration', t2.val->'outgoing'->'71'->0->'targetValue'->'timePrimitive'->'duration',
                                    'calendar', t2.val->'outgoing'->'71'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END,
                            'p82', CASE WHEN t2.val->'outgoing'->'72' IS NOT NULL THEN json_build_object(
                                'julianDay', t2.val->'outgoing'->'72'->0->'targetValue'->'timePrimitive'->'julianDay',
                                'duration', t2.val->'outgoing'->'72'->0->'targetValue'->'timePrimitive'->'duration',
                                'calendar', t2.val->'outgoing'->'72'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END,
                            'p81a', CASE WHEN t2.val->'outgoing'->'150' IS NOT NULL THEN json_build_object(
                                'julianDay', t2.val->'outgoing'->'150'->0->'targetValue'->'timePrimitive'->'julianDay',
                                'duration', t2.val->'outgoing'->'150'->0->'targetValue'->'timePrimitive'->'duration',
                                'calendar', t2.val->'outgoing'->'150'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END,
                            'p81b', CASE WHEN t2.val->'outgoing'->'151' IS NOT NULL THEN json_build_object(
                                'julianDay', t2.val->'outgoing'->'151'->0->'targetValue'->'timePrimitive'->'julianDay',
                                'duration', t2.val->'outgoing'->'151'->0->'targetValue'->'timePrimitive'->'duration',
                                'calendar', t2.val->'outgoing'->'151'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END,
                            'p82a', CASE WHEN t2.val->'outgoing'->'152' IS NOT NULL THEN json_build_object(
                                'julianDay', t2.val->'outgoing'->'152'->0->'targetValue'->'timePrimitive'->'julianDay',
                                'duration', t2.val->'outgoing'->'152'->0->'targetValue'->'timePrimitive'->'duration',
                                'calendar', t2.val->'outgoing'->'152'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END,
                            'p82b', CASE WHEN t2.val->'outgoing'->'153' IS NOT NULL THEN json_build_object(
                                'julianDay', t2.val->'outgoing'->'153'->0->'targetValue'->'timePrimitive'->'julianDay',
                                'duration', t2.val->'outgoing'->'153'->0->'targetValue'->'timePrimitive'->'duration',
                                'calendar', t2.val->'outgoing'->'153'->0->'targetValue'->'timePrimitive'->'calendar'
                            ) END
                        )),
                        'firstSecond',  (SELECT min(unnest) FROM unnest(ARRAY[
                                (t2.val->'outgoing'->'71'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint,
                                (t2.val->'outgoing'->'72'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint,
                                (t2.val->'outgoing'->'150'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint,
                                (t2.val->'outgoing'->'151'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint,
                                (t2.val->'outgoing'->'152'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint,
                                (t2.val->'outgoing'->'153'->0->'targetValue'->'timePrimitive'->>'firstSecond')::bigint
                            ])),
                        'lastSecond',  (SELECT max(unnest) FROM unnest(ARRAY[
                                (t2.val->'outgoing'->'71'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint,
                                (t2.val->'outgoing'->'72'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint,
                                (t2.val->'outgoing'->'150'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint,
                                (t2.val->'outgoing'->'151'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint,
                                (t2.val->'outgoing'->'152'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint,
                                (t2.val->'outgoing'->'153'->0->'targetValue'->'timePrimitive'->>'lastSecond')::bigint
                            ]))
                    ))
                `
            }
        })

        builder.registerUpsertHook()
        // await builder.printQueries()
        const count = builder.executeQueries()

        return count
    }

    // onUpsertSql(tableAlias: string) {
    //     return `
    //     UPDATE war.entity_preview
    //     SET time_span = (${tableAlias}.val->>'timeSpan')::jsonb,
    //         first_second = (${tableAlias}.val->>'firstSecond')::bigint,
    //         last_second = (${tableAlias}.val->>'lastSecond')::bigint
    //     FROM ${tableAlias}
    //     WHERE pk_entity = ${tableAlias}."pkEntity"
    //     AND project = 0
    //     AND (
    //         time_span,
    //         first_second,
    //         last_second
    //     )
    //     IS DISTINCT FROM
    //     (
    //         (${tableAlias}.val->>'timeSpan')::jsonb,
    //         (${tableAlias}.val->>'firstSecond')::bigint,
    //         (${tableAlias}.val->>'lastSecond')::bigint
    //     )`
    // }
}

