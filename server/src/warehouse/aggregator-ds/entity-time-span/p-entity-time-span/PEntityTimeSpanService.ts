import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {EntityFields, EntityTimePrimitive} from "../../../primary-ds/edge/edge.commons";
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityTimeSpanAggregator} from './PEntityTimeSpanAggregator';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';

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
@Injectable()
export class PEntityTimeSpanService extends AggregatedDataService2<PEntityId, PEntityTimeSpanVal>{
    aggregator = PEntityTimeSpanAggregator;
    providers = PEntityTimeSpanProviders;

    depPEntity: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, PEntity>
    depPEdge: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, EntityFields>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService
    ) {
        super(
            wh,
            pEntityKeyDefs
        )

        this.registerCreatorDS({
            dataService: pEntity,
            customSql: [
                {
                    where: `val->>'entityType' = 'teEn'`,
                }
            ]
        })
        this.depPEntity = this.addDepencency(pEntity);
        this.depPEdge = this.addDepencency(pEdge);

    }

    async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const pentity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depPEntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })
        await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depPEdge,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
                fkProject: {leftCol: 'fkProject'}
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
    //     AND project = ${tableAlias}."fkProject"
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

