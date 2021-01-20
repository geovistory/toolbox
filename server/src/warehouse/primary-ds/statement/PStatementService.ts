/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
export interface PStatementId {
  pkEntity: number;
  fkProject: number;

}
export interface PStatementVal {
  fkProperty: number;
  fkObjectInfo: number;
  fkSubjectInfo: number;
  ordNumOfDomain: number;
  ordNumOfRange: number;
  isInProjectCount: number;
}
export const pStatementKeyDefs: KeyDefinition[] = [
  {
    name: 'pkEntity',
    type: 'integer'
  },
  {
    name: 'fkProject',
    type: 'integer'
  }
]

@Injectable()
export class PStatementService extends PrimaryDataService<PStatementId, PStatementVal>{

  measure = 10000;


  constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
    super(
      wh,
      [
        'modified_projects_info_proj_rel',
      ],
      pStatementKeyDefs
    )
    this.registerUpdateReplication(
      'war.statement',
      (insertClause: string, fromClause: string) => `
      INSERT INTO war.statement
        (pk_entity,
        fk_project,
        project,
        fk_property,
        fk_object_info,
        fk_subject_info,
        ord_num_of_domain,
        ord_num_of_range,
        is_in_project_count,
        object_info_value)
      SELECT
          t1."pkEntity",
          t1."fkProject",
          t1."fkProject",
          (t1.val->>'fkProperty')::int,
          (t1.val->>'fkObjectInfo')::int,
          (t1.val->>'fkSubjectInfo')::int,
          (t1.val->>'ordNumOfDomain')::int,
          (t1.val->>'ordNumOfRange')::int,
          (t1.val->>'isInProjectCount')::int,
          t1.val->'objectInfoValue'
      FROM ${fromClause} t1
      ON CONFLICT (pk_entity, project) DO UPDATE
      SET pk_entity = EXCLUDED.pk_entity,
          fk_project = EXCLUDED.fk_project,
          project = EXCLUDED.project,
          fk_property = EXCLUDED.fk_property,
          fk_object_info = EXCLUDED.fk_object_info,
          fk_subject_info = EXCLUDED.fk_subject_info,
          ord_num_of_domain = EXCLUDED.ord_num_of_domain,
          ord_num_of_range = EXCLUDED.ord_num_of_range,
          is_in_project_count = EXCLUDED.is_in_project_count,
          object_info_value = EXCLUDED.object_info_value
      `
    )
  }


  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql(tmsp: Date) {
    return deleteSql
  };

}


const updateSql = `

WITH tw0 AS (
  -- select chanced info_proj_rel pointing to a statement
  SELECT DISTINCT
      t2.pk_entity,
      t1.fk_project,
      t1.ord_num_of_domain,
      t1.ord_num_of_range,
      t1.calendar
  FROM
      projects.info_proj_rel t1
  JOIN
      information."statement" t2 ON t1.fk_entity = t2.pk_entity
  WHERE
      t1.tmsp_last_modification > $1
  AND
      t1.is_in_project = true
),
tw1 AS (
SELECT
    t0.fk_project,
    t0.pk_entity,
    t0.ord_num_of_domain,
    t0.ord_num_of_range,
    t1.fk_property,
    t1.fk_object_info,
    t1.fk_subject_info,
    t2.is_in_project_count,

    -- appellation
    CASE WHEN t3.pk_entity IS NOT NULL THEN jsonb_build_object(
      'pkEntity', t3.pk_entity,
      'fkClass', t3.fk_class,
      'string', t3.string
    ) ELSE NULL::jsonb END appellation,

    -- language
    CASE WHEN t4.pk_entity IS NOT NULL THEN jsonb_build_object(
      'pkEntity', t4.pk_entity,
      'fkClass', t4.fk_class,
      'iso6391', t4.iso6391,
      'iso6392b', t4.iso6392b,
      'iso6392t', t4.iso6392t,
      'label', t4.notes
    ) ELSE NULL::jsonb END "language",

    -- place
    CASE WHEN t5.pk_entity IS NOT NULL THEN jsonb_build_object(
      'pkEntity', t5.pk_entity,
      'fkClass', t5.fk_class,
      'geoJSON', ST_AsGeoJSON(t5.geo_point::geometry)::json
    ) ELSE NULL::jsonb END place,

    -- time_primitive
    CASE WHEN t6.pk_entity IS NOT NULL THEN
      commons.time_primitive__pretty_json(t6, t0.calendar)
    ELSE NULL::jsonb END time_primitive,

    -- lang_string
    CASE WHEN t7.pk_entity IS NOT NULL THEN jsonb_build_object(
      'pkEntity', t7.pk_entity,
      'fkClass', t7.fk_class,
      'string', t7.string,
      'fkLanguage', t7.fk_language
    )
    ELSE NULL::jsonb END lang_string,

    -- dimension
    CASE WHEN t8.pk_entity IS NOT NULL THEN jsonb_build_object(
      'pkEntity', t8.pk_entity,
      'fkClass', t8.fk_class,
      'fkMeasurementUnit', t8.fk_measurement_unit,
      'numericValue', t8.numeric_value
    )
    ELSE NULL::jsonb END dimension

  FROM tw0 t0
  JOIN information.statement t1 ON t1.pk_entity = t0.pk_entity
  LEFT JOIN LATERAL (
      SELECT count(info_proj_rel.pk_entity)::integer AS is_in_project_count
      FROM projects.info_proj_rel
      WHERE info_proj_rel.fk_entity = t1.pk_entity
      AND info_proj_rel.is_in_project = true
      GROUP BY info_proj_rel.fk_entity
  ) t2 ON true

  LEFT JOIN information.appellation t3 ON t3.pk_entity = t1.fk_object_info
  LEFT JOIN information.language t4 ON t4.pk_entity = t1.fk_object_info
  LEFT JOIN information.place t5 ON t5.pk_entity = t1.fk_object_info
  LEFT JOIN information.time_primitive t6 ON t6.pk_entity = t1.fk_object_info
  LEFT JOIN information.lang_string t7 ON t7.pk_entity = t1.fk_object_info
  LEFT JOIN information.dimension t8 ON t8.pk_entity = t1.fk_object_info

)
SELECT
t1.fk_project "fkProject",
t1.pk_entity "pkEntity",
jsonb_build_object(
'fkProperty', fk_property,
'fkObjectInfo', fk_object_info,
'fkSubjectInfo', fk_subject_info,
'ordNumOfDomain', ord_num_of_domain,
'ordNumOfRange', ord_num_of_range,
'isInProjectCount', is_in_project_count,
'objectInfoValue',  CASE WHEN
					t1.appellation IS NULL
					AND t1.place IS NULL
					AND t1.language IS NULL
					AND t1.time_primitive IS NULL
					AND t1.lang_string IS NULL
					AND t1.dimension IS NULL
				THEN NULL::jsonb
				ELSE
					jsonb_strip_nulls(jsonb_build_object(
						'string', t1.appellation,
						'geometry', t1.place,
						'language', t1.language,
						'timePrimitive', t1.time_primitive,
						'langString', t1.lang_string,
						'dimension', t1.dimension
					))
				END
) val
FROM tw1 t1
`


const deleteSql = `
WITH tw1 AS (
  SELECT
      t1.fk_project "fkProject",
      t2.pk_entity "pkEntity"
  FROM
  projects.info_proj_rel t1
  JOIN information.statement t2 ON t1.fk_entity = t2.pk_entity
  WHERE t1.is_in_project=false
  AND t1.tmsp_last_modification >= $1
),
tw2 AS (
  DELETE FROM war.statement
  USING tw1
  WHERE pk_entity = tw1."pkEntity"
  AND fk_project = tw1."fkProject"
)
SELECT * FROM tw1
`
