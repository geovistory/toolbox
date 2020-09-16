/* eslint-disable @typescript-eslint/naming-convention */
import {Logger} from '../../base/classes/Logger';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {pEntityIdToString, stringToPEntityId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {PEntityId} from '../entity/PEntityService';
import {buildIncomingEdges, buildOutgoingEdges, Edge, EdgeInitItem, EntityFields, StatementItemToIndexate} from './edge.commons';

interface Noun {
    table: string;
    fkInfo: number;
    value: {
        appellation: string | null;
        language: string | null;
        lang_string: string | null;
    };
}



export class PEdgeService extends PrimaryDataService<EdgeInitItem, PEntityId, EntityFields>{

    measure = 10000;


    constructor(wh: Warehouse) {
        super(wh, [
            'modified_projects_info_proj_rel',
        ], pEntityIdToString, stringToPEntityId)
    }


    dbItemToKeyVal(item: EdgeInitItem): {key: PEntityId; val: EntityFields;} {
        const key = {pkEntity: item.pkEntity, fkProject: item.fkProject}
        const val = item.fields
        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};


    // function is only used to easily add mock data
    async indexateItems(items: StatementItemToIndexate[]) {
        let i = 0

        for (const item of items) {
            const s: Noun = {
                table: item.subject_table,
                fkInfo: item.fk_subject_info,
                value: {
                    appellation: null,
                    language: null,
                    lang_string: null
                }
            };
            const o: Noun = {
                table: item.object_table,
                fkInfo: item.fk_object_info,
                value: {
                    appellation: item.appellation,
                    language: item.language,
                    lang_string: item.lang_string
                }
            };
            const outgoing = true;
            // add edge going out of entity
            if (this.isEntityTable(s.table)) {
                await this.addEdgeToEdgedsPerEntity(item, s, o, outgoing);
            }
            // add edge coming in to entity
            if (this.isEntityTable(o.table)) {
                await this.addEdgeToEdgedsPerEntity(item, o, s, !outgoing);
            }
            i++
            if (i % this.measure === 0) {
                Logger.msg(`indexed ${i} edges`, 1)
            }


        }
    }

    isEntityTable(str: string) {
        return (str === 'temporal_entity' || str === 'persistent_item')
    }

    private async addEdgeToEdgedsPerEntity(item: StatementItemToIndexate, a: Noun, b: Noun, isOutgoing: boolean) {
        const fkProperty = item.fk_property
        const fkPropStr = fkProperty.toString()
        const key: PEntityId = {
            fkProject: item.fk_project,
            pkEntity: a.fkInfo,
        }
        let val = await this.index.getFromIdx(key);
        if (!val) val = {outgoing: {}, incoming: {}};
        const outgoing = val.outgoing
        const incoming = val.incoming



        const edge: Edge = {
            fkStatement: item.pk_statement,
            // fkSubject: item.fk_subject_info,
            fkProperty,
            // fkObject: item.fk_object_info,

            fkSource: a.fkInfo,
            fkTarget: b.fkInfo,
            isOutgoing: isOutgoing,
            targetLabel: (b?.value?.appellation ?? (b?.value?.lang_string) ?? b?.value?.language) ?? b.fkInfo.toString(),
            targetValue: b.value,
            ordNumWithinField: item.ord_num_of_range,
            targetIsEntity: isOutgoing ? this.isEntityTable(item.object_table) : this.isEntityTable(item.subject_table)
        }


        if (isOutgoing) {
            if (!outgoing[fkPropStr]) outgoing[fkPropStr] = []
            outgoing[fkPropStr].push(edge)
        }
        else {
            if (!incoming[fkPropStr]) incoming[fkPropStr] = []
            incoming[fkPropStr].push(edge)
        }
        await this.index.addToIdx(key, val)

    }





}



const updateSql = `

WITH tw0 AS (
    -- select affected entities
    SELECT DISTINCT
        t2.fk_subject_info pk_entity,
        t1.fk_project
    FROM
        projects.info_proj_rel t1
    JOIN
        information."statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN
        information.entity t3 ON t2.fk_subject_info = t3.pk_entity
    WHERE
        t1.tmsp_last_modification > $1

    AND
        t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT DISTINCT
        t2.fk_object_info pk_entity,
        t1.fk_project
    FROM
        projects.info_proj_rel t1
    JOIN
        information."statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN
        information.entity t3 ON t2.fk_object_info = t3.pk_entity
    WHERE
        t1.tmsp_last_modification > $1

    AND
        t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT DISTINCT
        t2.pk_entity,
        t1.fk_project
    FROM
        projects.info_proj_rel t1
    JOIN
        information.entity t2 ON t1.fk_entity = t2.pk_entity
    WHERE
        t2.table_name IN ('temporal_entity', 'persistent_item')
    AND
        t1.tmsp_last_modification > $1

), tw1 AS (
    SELECT DISTINCT
    t1.fk_project,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t1.calendar,
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
    t6.duration
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
    AND t7.pk_entity IS NULL
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
    WHERE t1.subject_table IN ('temporal_entity', 'persistent_item')
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
    WHERE t1.object_table IN ('temporal_entity', 'persistent_item')
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
COALESCE(t2.fields, '{}'::json) fields
FROM tw0 t1
LEFT JOIN tw5 t2 ON t1.pk_entity = t2.pk_entity AND t1.fk_project =  t2.fk_project
`
