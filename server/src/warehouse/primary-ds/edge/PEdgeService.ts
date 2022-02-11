/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {sum} from 'lodash';
import {PoolClient} from 'pg';
import {Logger} from '../../base/classes/Logger';
import {PgDataReplicator} from '../../base/classes/PgDataReplicator';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {Warehouse} from '../../Warehouse';
import {PEntityId, pEntityKeyDefs} from '../entity/PEntityService';
import {buildIncomingEdges, buildOutgoingEdges, EntityFields} from './edge.commons';

interface Noun {
    table: string;
    fkInfo: number;
    value: {
        appellation: string | null;
        language: string | null;
        lang_string: string | null;
    };
}



@Injectable()
export class PEdgeService extends PrimaryDataService<PEntityId, EntityFields>{

    measure = 10000;


    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            [
                'modified_projects_info_proj_rel',
            ],
            pEntityKeyDefs
        )
    }


    getUpdatesSql(tmsp: Date) {return ''}
    getDeletesSql(tmsp: Date) {return ''};

    async manageUpdatesSince(pool1: PoolClient, pool2: PoolClient, date: Date = new Date(0)) {

        const t2 = Logger.start(this.constructor.name, `Execute update query  ...`, 2);

        const tmpTable = `${this.constructor.name}_update_tmp`

        const stats = await new PgDataReplicator<{count: number}>(
            {client: pool1, table: tmpTable},
            {client: pool2, table: this.index.schemaTable},
            [this.index.keyCols, 'val'],
            (insertClause, fromClause) => `
                WITH tw1 AS (
                    ${insertClause}
                    ${fromClause}
                    ON CONFLICT (${this.index.keyCols}) DO UPDATE
                    SET val = EXCLUDED.val
                    WHERE  ${this.index.schemaTable}.val <> EXCLUDED.val
                    RETURNING *
                )
                SELECT count(*)::int FROM tw1
            `
        ).replicateBatch(
            date,
            countSql,
            updateBatchSql,
        )
        const upserted = sum(stats.map(s => s.rows?.[0].count))

        Logger.itTook(this.constructor.name, t2, `to update Primary Data Service with ${upserted} new lines`, 2);

        if (this.updateReplications.length > 0) {
            const replicationRequest = this.updateReplications.map(repl => {
                return new PgDataReplicator<{count: number}>(
                    {client: pool1, table: tmpTable},
                    {client: pool1, table: repl.targetTable},
                    [this.index.keyCols, 'val'],
                    repl.sqlFn
                ).replicateTable()
            })
            await Promise.all(replicationRequest)
        }

        return upserted

    }

}


const twIds = `
    WITH tw AS (
        -- select affected entities
        SELECT
            t2.fk_subject_info pk_entity,
            t1.fk_project
        FROM
            projects.info_proj_rel t1
        JOIN
            information."statement" t2 ON t1.fk_entity = t2.pk_entity
        JOIN
            information.resource t3 ON t2.fk_subject_info = t3.pk_entity
        WHERE
            t1.tmsp_last_modification > $1
        UNION ALL
        SELECT
            t2.fk_object_info pk_entity,
            t1.fk_project
        FROM
            projects.info_proj_rel t1
        JOIN
            information."statement" t2 ON t1.fk_entity = t2.pk_entity
        JOIN
            information.resource t3 ON t2.fk_object_info = t3.pk_entity
        WHERE
            t1.tmsp_last_modification > $1
        UNION ALL
        SELECT
            t2.pk_entity,
            t1.fk_project
        FROM
            projects.info_proj_rel t1
        JOIN
            information.resource t2 ON t1.fk_entity = t2.pk_entity
        WHERE
            t1.tmsp_last_modification > $1

    )
`
const countSql = `
    ${twIds},
    tw1 AS (
        SELECT fk_project, pk_entity
        FROM tw
        GROUP BY fk_project, pk_entity
    )
    select count(*):: integer
    from tw1
`
const updateBatchSql = (limit: number, offset: number) => `
 ${twIds},
tw0 AS (
    SELECT fk_project, pk_entity
    FROM tw
    GROUP BY fk_project, pk_entity
    LIMIT ${limit} OFFSET ${offset}
),
tw1 AS (
    SELECT DISTINCT
    t1.fk_project,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t2.pk_entity as pk_statement,
    t2.fk_property,
    t2.fk_subject_info,
    t8.table_name subject_table,
    t2.fk_object_info,
    t9.table_name object_table,
    t3.string as appellation,
    t4.notes as language,
    t7.string as lang_string,
    t6.julian_day,
    t6.duration,
    t6.calendar
    FROM
    tw0 t0
    JOIN projects.info_proj_rel t1 ON t1.fk_project = t0.fk_project
    JOIN information."statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN information.entity t8 ON t8.pk_entity =  t2.fk_subject_info
    JOIN information.entity t9 ON t9.pk_entity =  t2.fk_object_info
    LEFT JOIN information.appellation t3 ON t3.pk_entity = t2.fk_object_info
    LEFT JOIN information.language t4 ON t4.pk_entity = t2.fk_object_info
    LEFT JOIN information.place t5 ON t5.pk_entity = t2.fk_object_info
    LEFT JOIN information.time_primitive t6 ON t6.pk_entity = t2.fk_object_info
    LEFT JOIN information.lang_string t7 ON t7.pk_entity = t2.fk_object_info
    WHERE
    (
        t2.fk_subject_info = t0.pk_entity
        OR
        t2.fk_object_info = t0.pk_entity
    ) AND
    t1.is_in_project=true
    AND t2.fk_object_info IS NOT NULL

    -- TODO: Remove these where clauses as soon as the left joined value object
    -- table is implemented (below in json)
    AND t4.pk_entity IS NULL
    AND t5.pk_entity IS NULL
),
-- outgoing
tw2 AS (
    SELECT
        fk_project,
        fk_property,
        fk_subject_info pk_entity,
        json_agg(
            ${buildOutgoingEdges}
            ORDER BY t1.ord_num_of_range ASC
        ) outgoing
    FROM tw1 t1
    WHERE t1.subject_table IN ('resource')
    GROUP BY fk_project, fk_property, fk_subject_info
    ORDER BY fk_project, fk_property, fk_subject_info
),
-- incoming
tw3 AS (
    SELECT
        fk_project,
        fk_property,
        fk_object_info pk_entity,
        json_agg(
            ${buildIncomingEdges}
             ORDER BY t1.ord_num_of_domain ASC
        ) incoming
    FROM tw1 t1
    WHERE t1.object_table IN ('resource')
    GROUP BY fk_project, fk_property, fk_object_info
    ORDER BY fk_project, fk_property, fk_object_info
),
tw4 AS (
    SELECT fk_project, fk_property, pk_entity, outgoing, NULL::json incoming
    FROM tw2
    UNION ALL
    SELECT fk_project, fk_property, pk_entity, NULL::json outgoing, incoming
    FROM tw3
),
tw5 AS (
    SELECT
    fk_project,
    pk_entity,
    json_build_object(
        'outgoing', json_strip_nulls(json_object_agg(fk_property, outgoing)),
        'incoming', json_strip_nulls(json_object_agg(fk_property, incoming))
    ) fields
    FROM tw4

    GROUP BY
    fk_project,
    pk_entity
)
SELECT
t1.fk_project "fkProject",
t1.pk_entity "pkEntity",
COALESCE(t2.fields, '{}'::json) val
FROM tw0 t1
LEFT JOIN tw5 t2 ON t1.pk_entity = t2.pk_entity AND t1.fk_project =  t2.fk_project
`
