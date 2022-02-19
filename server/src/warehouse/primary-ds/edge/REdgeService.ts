/* eslint-disable @typescript-eslint/naming-convention */
import { forwardRef, Inject, Injectable } from 'injection-js';
import { PrimaryDataService } from '../../base/classes/PrimaryDataService';
import { Warehouse } from '../../Warehouse';
import { REntityId, rEntityKeyDefs } from '../entity/REntityService';
import { EntityFields } from "./edge.commons";


@Injectable()
export class REdgeService extends PrimaryDataService<REntityId, EntityFields>{

  measure = 10000;
  replicationBatchSizeUpdates = 1000;
  replicationBatchSizeDeletes = 1000;

  constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
    super(
      wh,
      [
        'modified_projects_info_proj_rel',
      ],
      rEntityKeyDefs
    )
  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql(tmsp: Date) { return '' };


}


const updateSql = `
WITH tw0 AS (
  -- select affected entities
  SELECT
    DISTINCT t2.fk_subject_info pk_entity
  FROM
    projects.info_proj_rel t1
    JOIN information. "statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN information.resource t3 ON t2.fk_subject_info = t3.pk_entity
  WHERE
    t1.tmsp_last_modification >= $1
  UNION
  SELECT
    DISTINCT t2.fk_object_info pk_entity
  FROM
    projects.info_proj_rel t1
    JOIN information. "statement" t2 ON t1.fk_entity = t2.pk_entity
    JOIN information.resource t3 ON t2.fk_object_info = t3.pk_entity
  WHERE
    t1.tmsp_last_modification >= $1
  UNION
  SELECT
    DISTINCT t2.pk_entity
  FROM
    projects.info_proj_rel t1
    JOIN information.resource t2 ON t1.fk_entity = t2.pk_entity
  WHERE
    t1.tmsp_last_modification >= $1
  ),

tw1 AS (
  SELECT
  t2.pk_entity as pk_statement,
  t2.fk_property,
  t2.fk_subject_info,
  t2.fk_object_info,
  count(t1.fk_project) is_in_project_count,
  AVG(t1.ord_num_of_range) :: numeric(10, 2) ord_num_of_range,
  (t10.pk_entity IS NOT NULL) target_is_entity,
  COALESCE(t12.string,  t14.notes, t15.string)  target_label,
  t12.string appellation_str,
  t14.notes language_str,
  t13.julian_day,
  t13.duration,
  t13.calendar
  FROM
  tw0 t0
  JOIN information."statement" t2 ON t2.fk_subject_info = t0.pk_entity

  LEFT JOIN information.resource t8 ON t8.pk_entity =  t2.fk_subject_info

  LEFT JOIN information.resource t10 ON t10.pk_entity =  t2.fk_object_info
  LEFT JOIN information.appellation t12 ON t12.pk_entity = t2.fk_object_info
  LEFT JOIN information.time_primitive t13 ON t13.pk_entity = t2.fk_object_info
  LEFT JOIN information.language t14 ON t14.pk_entity = t2.fk_object_info
  LEFT JOIN information.lang_string t15 ON t15.pk_entity = t2.fk_object_info

   JOIN projects.info_proj_rel t1 ON t1.fk_entity = t2.pk_entity
     AND t1.is_in_project = true

    WHERE
    -- subject is not null
      t8.pk_entity IS NOT NULL
  AND
    -- object is not null
    (
         t10.pk_entity IS NOT NULL
      OR t12.pk_entity IS NOT NULL
      OR t13.pk_entity IS NOT NULL
      OR t14.pk_entity IS NOT NULL
      OR t15.pk_entity IS NOT NULL
    )
  GROUP BY
    t2.pk_entity,
    t2.fk_property,
    t2.fk_subject_info,
    t2.fk_object_info,
    t10.pk_entity,
    t12.string,
    t14.notes,
    t15.string,
    t13.julian_day,
    t13.duration,
    t13.calendar
),
tw2 AS (

  SELECT
    t1.fk_subject_info pk_entity,
    t1.fk_property,
    json_agg(
      json_build_object(
      'fkProperty', t1.fk_property,
      'isOutgoing', true,
      'fkStatement', t1.pk_statement,
      'fkSource', t1.fk_subject_info,
      'fkTarget', t1.fk_object_info,
      'ordNumWithinField', t1.ord_num_of_range,
      'targetIsEntity', t1.target_is_entity,
      'targetLabel', t1.target_label,
      'targetValue',
      json_strip_nulls(
        json_build_object(
        'appellation', t1.appellation_str,
        'language', t1.language_str,
        'timePrimitive',
        CASE
          WHEN t1.julian_day IS NOT NULL THEN json_strip_nulls(
          json_build_object(
            'julianDay', t1.julian_day,
            'duration', t1.duration,
            'calendar', t1.calendar,
            'firstSecond', commons.time_primitive__get_first_second(t1.julian_day),
            'lastSecond', commons.time_primitive__get_last_second(t1.julian_day, t1.duration, t1.calendar)
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
  from tw1 t1
  GROUP BY
    t1.fk_property,
    t1.fk_subject_info
),
tw3 AS (
  SELECT
  t2.pk_entity as pk_statement,
  t2.fk_property,
  t2.fk_subject_info,
  t2.fk_object_info,
  count(t1.fk_project) is_in_project_count,
  AVG(t1.ord_num_of_domain) :: numeric(10, 2) ord_num_of_domain,
  (t10.pk_entity IS NOT NULL) target_is_entity
  FROM
  tw0 t0
  JOIN information."statement" t2 ON t2.fk_object_info = t0.pk_entity

  LEFT JOIN information.resource t8 ON t8.pk_entity =  t2.fk_object_info

  LEFT JOIN information.resource t10 ON t10.pk_entity =  t2.fk_subject_info

  JOIN projects.info_proj_rel t1 ON t1.fk_entity = t2.pk_entity
     AND t1.is_in_project = true

    WHERE
      t8.pk_entity IS NOT NULL
  AND
      t10.pk_entity IS NOT NULL
  GROUP BY
    t2.pk_entity,
    t2.fk_property,
    t2.fk_subject_info,
    t2.fk_object_info,
    t10.pk_entity
),
tw4 AS (

  SELECT
    t1.fk_object_info pk_entity,
    t1.fk_property,
    json_agg(
      json_build_object(
      'fkProperty', t1.fk_property,
      'isOutgoing', false,
      'fkStatement', t1.pk_statement,
      'fkSource', t1.fk_object_info,
      'fkTarget', t1.fk_subject_info,
      'ordNumWithinField', t1.ord_num_of_domain,
      'targetIsEntity', t1.target_is_entity
      )
      ORDER BY
      t1.ord_num_of_domain ASC,
      t1.is_in_project_count DESC
    ) incoming
  from tw3 t1
  GROUP BY
    t1.fk_property,
    t1.fk_object_info
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
 LEFT JOIN tw2 t2 ON t1.pk_entity = t2.pk_entity
 LEFT JOIN tw4 t3 ON t1.pk_entity = t3.pk_entity
 GROUP BY
   t1.pk_entity
 `

