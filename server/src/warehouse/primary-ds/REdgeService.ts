/* eslint-disable @typescript-eslint/naming-convention */
import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {entityIdToString, stringToEntityId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {REntityId} from './REntityService';
import {EntityFields, EdgeInitItem} from './PEdgeService';


export class REdgeService extends PrimaryDataService<EdgeInitItem, REntityId, EntityFields>{

    measure = 10000;

    index = new IndexDBGeneric<REntityId, EntityFields>(entityIdToString, stringToEntityId)

    constructor(wh: Warehouse) {
        super(wh, [
            'modified_projects_info_proj_rel',
        ])
    }

    dbItemToKeyVal(item: EdgeInitItem): {key: REntityId; val: EntityFields;} {
        const key = {pkEntity: item.pkEntity, fkProject: item.fkProject}
        const val = item.fields
        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql = undefined;



    isEntityTable(str: string) {
        return (str === 'temporal_entity' || str === 'persistent_item')
    }


}


const updateSql = `
WITH tw0 AS (
    -- select affected entities
    SELECT DISTINCT
        t2.fk_subject_info pk_entity
    FROM
        projects.info_proj_rel t1
    JOIN
        information."statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN
        information.entity t3 ON t2.fk_subject_info = t3.pk_entity
    WHERE
        t1.tmsp_last_modification >  $1
    AND
        t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT DISTINCT
        t2.fk_object_info pk_entity
    FROM
        projects.info_proj_rel t1
    JOIN
        information."statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN
        information.entity t3 ON t2.fk_object_info = t3.pk_entity
    WHERE
        t1.tmsp_last_modification >  $1

    AND
        t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT DISTINCT
        t2.pk_entity
    FROM
        projects.info_proj_rel t1
    JOIN
        information.entity t2 ON t1.fk_entity = t2.pk_entity
    WHERE
        t2.table_name IN ('temporal_entity', 'persistent_item')
    AND
        t1.tmsp_last_modification >  $1

), tw1 AS (
    SELECT DISTINCT
	null as fk_project,
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
    JOIN information."statement" t2 ON (
			t2.fk_subject_info = t0.pk_entity
			OR
			t2.fk_object_info = t0.pk_entity
		) AND t2.fk_object_info IS NOT NULL
    JOIN information.entity t8 ON t8.pk_entity =  t2.fk_subject_info
    JOIN information.entity t9 ON t9.pk_entity =  t2.fk_object_info
    LEFT JOIN information.appellation t3 ON t3.pk_entity = t2.fk_object_info
    LEFT JOIN information.language t4 ON t4.pk_entity = t2.fk_object_info
    LEFT JOIN information.place t5 ON t5.pk_entity = t2.fk_object_info
    LEFT JOIN information.time_primitive t6 ON t6.pk_entity = t2.fk_object_info
    LEFT JOIN information.lang_string t7 ON t7.pk_entity = t2.fk_object_info
	LEFT JOIN LATERAL (
		SELECT
			AVG(t.ord_num_of_domain)::numeric(10,2) ord_num_of_domain,
		   	AVG(t.ord_num_of_range)::numeric(10,2) ord_num_of_range,
			mode() WITHIN GROUP (ORDER BY t.calendar) AS calendar
		FROM projects.info_proj_rel t
		WHERE t.fk_entity = t2.pk_entity AND t.is_in_project = true
  		GROUP BY t.fk_entity) t1 ON true

),
-- outgoing
tw2 AS (
    SELECT  fk_property, fk_subject_info pk_entity, json_agg(
        json_build_object(
            'fkProperty', t1.fk_property,
            'isOutgoing', true,
            'fkStatement', t1.pk_statement,
            'fkSource', t1.fk_subject_info,
            'fkTarget', t1.fk_object_info,
            'ordNumWithinField', t1.ord_num_of_range,
            'targetIsEntity', t1.object_table IN ('temporal_entity', 'persistent_item'),
            'targetLabel', COALESCE( t1.appellation,  t1.language,  t1.lang_string),
            'targetValue', json_strip_nulls(json_build_object(
    'appellation', t1.appellation,
    'language', t1.language,
    'langString', t1.lang_string,
    'timePrimitive', CASE WHEN t1.julian_day IS NOT NULL THEN
                        json_strip_nulls(json_build_object(
                            'julianDay', t1.julian_day,
                            'duration', t1.duration,
                            'calendar', t1.calendar,
                            'firstSecond', commons.time_primitive__get_first_second(t1.julian_day),
                            'lastSecond', commons.time_primitive__get_last_second(t1.julian_day,t1.duration,t1.calendar)
                        ))
                    ELSE
                        null
                    END
                ))
        ) ORDER BY t1.ord_num_of_range ASC
    ) outgoing
    FROM tw1 t1
    WHERE t1.subject_table IN ('temporal_entity', 'persistent_item')
    GROUP BY fk_property, fk_subject_info
    ORDER BY fk_property, fk_subject_info
),
-- incoming
tw3 AS (
    SELECT  fk_property, fk_object_info pk_entity, json_agg(
        json_build_object(
            'fkProperty', t1.fk_property,
            'isOutgoing', true,
            'fkStatement', t1.pk_statement,
            'fkSource', t1.fk_object_info,
            'fkTarget', t1.fk_subject_info,
            'ordNumWithinField', t1.ord_num_of_domain,
            'targetIsEntity', t1.subject_table IN ('temporal_entity', 'persistent_item'),
            'targetLabel', COALESCE( t1.appellation,  t1.language,  t1.lang_string),
            'targetValue', json_strip_nulls(json_build_object(
    'appellation', t1.appellation,
    'language', t1.language,
    'langString', t1.lang_string,
    'timePrimitive', CASE WHEN t1.julian_day IS NOT NULL THEN
                        json_strip_nulls(json_build_object(
                            'julianDay', t1.julian_day,
                            'duration', t1.duration,
                            'calendar', t1.calendar,
                            'firstSecond', commons.time_primitive__get_first_second(t1.julian_day),
                            'lastSecond', commons.time_primitive__get_last_second(t1.julian_day,t1.duration,t1.calendar)
                        ))
                    ELSE
                        null
                    END
                ))
        ) ORDER BY t1.ord_num_of_domain ASC
    ) incoming
    FROM tw1 t1
    WHERE t1.object_table IN ('temporal_entity', 'persistent_item')
    GROUP BY fk_project, fk_property, fk_object_info
    ORDER BY fk_project, fk_property, fk_object_info
),
tw4 AS (
    SELECT fk_property, pk_entity, outgoing, NULL::json incoming
    FROM tw2
    UNION ALL
    SELECT fk_property, pk_entity, NULL::json outgoing, incoming
    FROM tw3
),
tw5 AS (
    SELECT
    pk_entity,
    json_build_object(
        'outgoing', json_strip_nulls(json_object_agg(fk_property, outgoing)),
        'incoming', json_strip_nulls(json_object_agg(fk_property, incoming))
    ) fields
    FROM tw4
    GROUP BY
    pk_entity
)
SELECT
t1.pk_entity "pkEntity",
COALESCE(t2.fields, '{}'::json) fields
FROM tw0 t1
LEFT JOIN tw5 t2 ON t1.pk_entity = t2.pk_entity `
