/* eslint-disable @typescript-eslint/naming-convention */
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {rEntityIdToString, stringToREntityId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {REntityId, rEntityKeyDefs} from '../entity/REntityService';
import {EntityFields} from "./edge.commons";


export class REdgeService extends PrimaryDataService<REntityId, EntityFields>{

    measure = 10000;

    constructor(wh: Warehouse) {
        super(
            wh,
            [
                'modified_projects_info_proj_rel',
            ],
            rEntityIdToString, stringToREntityId,
            rEntityKeyDefs
        )
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};


}


const updateSql = `
WITH tw0 AS (
    -- select affected entities
    SELECT
      DISTINCT t2.fk_subject_info pk_entity
    FROM
      projects.info_proj_rel t1
      JOIN information. "statement" t2 ON t1.fk_entity = t2.pk_entity
      JOIN information.entity t3 ON t2.fk_subject_info = t3.pk_entity
    WHERE
      t1.tmsp_last_modification >= $1
      AND t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT
      DISTINCT t2.fk_object_info pk_entity
    FROM
      projects.info_proj_rel t1
      JOIN information. "statement" t2 ON t1.fk_entity = t2.pk_entity
      JOIN information.entity t3 ON t2.fk_object_info = t3.pk_entity
    WHERE
      t1.tmsp_last_modification >= $1
      AND t3.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    SELECT
      DISTINCT t2.pk_entity
    FROM
      projects.info_proj_rel t1
      JOIN information.entity t2 ON t1.fk_entity = t2.pk_entity
    WHERE
      t2.table_name IN ('temporal_entity', 'persistent_item')
      AND t1.tmsp_last_modification >= $1
    ),
    --outgoing
    tw1 AS (
    SELECT
      t2.fk_property,
      t2.fk_subject_info pk_entity,
      json_agg(
        json_build_object(
          'fkProperty',
          t2.fk_property,
          'isOutgoing',
          true,
          'fkStatement',
          t2.pk_entity,
          'fkSource',
          t2.fk_subject_info,
          'fkTarget',
          t2.fk_object_info,
          'ordNumWithinField',
          t1.ord_num_of_range,
          'targetIsEntity',
          t9.table_name IN ('temporal_entity', 'persistent_item'),
          'targetLabel',
          COALESCE(t3.string,  t4.notes, t7.string),
          'targetValue',
          json_strip_nulls(
            json_build_object(
              'appellation',
              t3.string,
              'language',
              t4.notes,
              'langString',
              t7.string,
              'timePrimitive',
              CASE
                WHEN t6.julian_day IS NOT NULL THEN json_strip_nulls(
                  json_build_object(
                    'julianDay',
                    t6.julian_day,
                    'duration',
                    t6.duration,
                    'calendar',
                    t1.calendar,
                    'firstSecond',
                    commons.time_primitive__get_first_second(t6.julian_day),
                    'lastSecond',
                    commons.time_primitive__get_last_second(t6.julian_day, t6.duration, t1.calendar)
                  )
                )
                ELSE null
              END
            )
          )
        )
        ORDER BY
          t1.ord_num_of_range ASC,
          t1.is_in_project_count DESC
    ) outgoing
    FROM
      tw0 t0
      JOIN information."statement" t2 ON t2.fk_subject_info = t0.pk_entity
        AND t2.fk_object_info IS NOT NULL -- as long as we exclude fk_object_data etc.
      JOIN information.entity t8 ON t8.pk_entity = t2.fk_subject_info
      JOIN information.entity t9 ON t9.pk_entity = t2.fk_object_info
      LEFT JOIN information.appellation t3 ON t3.pk_entity = t2.fk_object_info
      LEFT JOIN information.language t4 ON t4.pk_entity = t2.fk_object_info
      LEFT JOIN information.place t5 ON t5.pk_entity = t2.fk_object_info
      LEFT JOIN information.time_primitive t6 ON t6.pk_entity = t2.fk_object_info
      LEFT JOIN information.lang_string t7 ON t7.pk_entity = t2.fk_object_info
      LEFT JOIN LATERAL (
        SELECT
          AVG(t.ord_num_of_domain) :: numeric(10, 2) ord_num_of_domain,
          AVG(t.ord_num_of_range) :: numeric(10, 2) ord_num_of_range,
          mode() WITHIN GROUP (
            ORDER BY
              t.calendar
          ) AS calendar,
          count(t.pk_entity) is_in_project_count
        FROM
          projects.info_proj_rel t
        WHERE
          t.fk_entity = t2.pk_entity
          AND t.is_in_project = true
        GROUP BY
          t.fk_entity
      ) t1 ON true
    WHERE
        t1.is_in_project_count IS NOT NULL
    AND
     t8.table_name IN ('temporal_entity', 'persistent_item')
    GROUP BY
      t2.fk_property,
      t2.fk_subject_info
    ORDER BY
      t2.fk_property,
      t2.fk_subject_info
    ),
    -- incoming
    tw2 AS (
    SELECT
      t2.fk_property,
      t2.fk_object_info pk_entity,
      json_agg(
        json_build_object(
          'fkProperty',
          t2.fk_property,
          'isOutgoing',
          false,
          'fkStatement',
          t2.pk_entity,
          'fkSource',
          t2.fk_object_info,
          'fkTarget',
          t2.fk_subject_info,
          'ordNumWithinField',
          t1.ord_num_of_domain,
          'targetIsEntity',
          t8.table_name IN ('temporal_entity', 'persistent_item')
        )
        ORDER BY
          t1.ord_num_of_domain ASC,
          t1.is_in_project_count DESC
      ) incoming
    FROM
      tw0 t0
      JOIN information. "statement" t2 ON t2.fk_object_info = t0.pk_entity
      JOIN information.entity t8 ON t8.pk_entity = t2.fk_subject_info
      JOIN information.entity t9 ON t9.pk_entity = t2.fk_object_info
      LEFT JOIN LATERAL (
        SELECT
          AVG(t.ord_num_of_domain) :: numeric(10, 2) ord_num_of_domain,
          AVG(t.ord_num_of_range) :: numeric(10, 2) ord_num_of_range,
          mode() WITHIN GROUP (
            ORDER BY
              t.calendar
          ) AS calendar,
          count(t.pk_entity) is_in_project_count
        FROM
          projects.info_proj_rel t
        WHERE
          t.fk_entity = t2.pk_entity
          AND t.is_in_project = true
        GROUP BY
          t.fk_entity
      ) t1 ON true
    WHERE
      t1.is_in_project_count IS NOT NULL
      AND
      t9.table_name IN ('temporal_entity', 'persistent_item')
    GROUP BY
      t2.fk_property,
      t2.fk_object_info
    ORDER BY
      t2.fk_property,
      t2.fk_object_info
    )
    SELECT
        t1.pk_entity "pkEntity",
        json_build_object(
          'outgoing',
            json_strip_nulls( COALESCE(json_object_agg(t2.fk_property, t2.outgoing) FILTER (WHERE t2.fk_property IS NOT NULL), '{}') ),
          'incoming',
            json_strip_nulls( COALESCE(json_object_agg(t3.fk_property, t3.incoming) FILTER (WHERE t3.fk_property IS NOT NULL), '{}') )
        ) val
    FROM
      tw0 t1
    LEFT JOIN tw1 t2 ON t1.pk_entity = t2.pk_entity
    LEFT JOIN tw2 t3 ON t1.pk_entity = t3.pk_entity
    GROUP BY
      t1.pk_entity`
