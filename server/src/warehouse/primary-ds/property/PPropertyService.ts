import {forwardRef, Inject, Injectable} from 'injection-js';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';
export interface PPropertyId {
  fkProject: number,
  pkProperty: number,
  fkDomain: number
  fkRange: number
}
export interface PPropertyVal {
  fkProperty: number
  fkProject: number,
  fkDomain: number
  fkRange: number
}
export const pPropertyKeyDef: KeyDefinition[] = [
  {name: 'fkProject', type: 'integer'},
  {name: 'pkProperty', type: 'integer'},
  {name: 'fkDomain', type: 'integer'},
  {name: 'fkRange', type: 'integer'}
]
@Injectable()
export class PPropertyService extends PrimaryDataService<PPropertyId, PPropertyVal>{

  measure = 1000;
  constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
    super(
      wh,
      [
        'modified_projects_project',
        'modified_projects_dfh_profile_proj_rel',
        'modified_data_for_history_api_property',
        'modified_data_for_history_api_class'
      ],
      pPropertyKeyDef
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
  WITH tw1 AS (
    SELECT fk_profile, fk_project, enabled, tmsp_last_modification
    FROM projects.dfh_profile_proj_rel
    WHERE enabled = true
    UNION ALL
    SELECT fk_profile, pk_entity as fk_project, true, null
    FROM projects.project,
    (
      SELECT jsonb_array_elements_text(config->'ontome'->'requiredOntomeProfiles')::int fk_profile
      FROM system.config
    ) as requiredProfiles
  )
  SELECT DISTINCT
    fk_project "fkProject",
    dfh_pk_property "pkProperty",
    dfh_property_domain "fkDomain",
    dfh_property_range "fkRange",
    jsonb_build_object(
      'fkProject', fk_project,
      'fkProperty', dfh_pk_property,
      'fkDomain', dfh_property_domain,
      'fkRange', dfh_property_range
    ) val
  FROM
    tw1 t1,
    data_for_history.api_property t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
  AND (
        t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
  )
  --- add generic incoming 1111 for all classes of basic type 8/9/30
  UNION
  SELECT DISTINCT
    fk_project "fkProject",
    1111 "pkProperty",
    365 "fkDomain",
    t2.dfh_pk_class "fkRange",
    jsonb_build_object(
      'fkProject', fk_project,
      'fkProperty', 1111,
      'fkDomain', 365,
      'fkRange',  t2.dfh_pk_class
    ) val
  FROM
      tw1 t1,
      data_for_history.api_class t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
  AND t2.dfh_pk_class <> 365
  AND  (
    t2.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >= $1
  )
  AND t2.dfh_basic_type IN (8, 9, 30)
  GROUP BY t2.dfh_pk_class, t1.fk_project
`
export const deleteSql = `
  WITH tw1 AS (
    SELECT fk_profile, fk_project, enabled, tmsp_last_modification
    FROM projects.dfh_profile_proj_rel
    WHERE enabled = false
    AND tmsp_last_modification >= $1
  )
  SELECT DISTINCT
    dfh_pk_property "pkProperty",
    fk_project "fkProject",
    dfh_property_domain "fkDomain",
    dfh_property_range "fkRange"
  FROM
    tw1 t1,
    data_for_history.api_property t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
`



