import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {Warehouse} from '../../Warehouse';
import {pClassIdKeyDef} from '../ProClassFieldsConfigService';
import {Injectable, Inject, forwardRef} from 'injection-js';
export interface PClassId {fkProject: number, pkClass: number}
export interface PClassVal {
  fkClass: number
  fkProject: number
  basicType: number
}

@Injectable()
export class PClassService extends PrimaryDataService<PClassId, PClassVal>{

  measure = 1000;

  constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
    super(
      wh,
      [
        'modified_projects_project',
        'modified_projects_dfh_profile_proj_rel',
        'modified_data_for_history_api_class'
      ],
      pClassIdKeyDef
    )

    /**
     * Add actions after a new ProjectClass is put/updated into index
     */
    // this.afterPut$.subscribe(item => {
    //   // Add update requests on aggregaters based on project class
    //   wh.agg.pClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))


    //   // Generate incoming class field for 'has appellation' property 1111
    //   if ([8, 9, 30].includes(item.val.basicType)) {
    //     const incomingField: PClassFieldId = {
    //       fkProject: item.key.fkProject,
    //       fkClass: item.val.fkClass,
    //       fkProperty: 1111,
    //       isOutgoing: false
    //     }
    //     wh.agg.pClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
    //   }
    // })



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
    UNION
    SELECT 5, pk_entity as fk_project, true, null -- GEOVISTORY BASICS
    FROM projects.project
  )
  SELECT DISTINCT ON (dfh_pk_class, fk_project)
    dfh_pk_class "pkClass",
    fk_project "fkProject",
    jsonb_build_object(
      'fkClass', dfh_pk_class,
      'fkProject', fk_project,
      'basicType', dfh_basic_type
    ) val
  FROM
    tw1 t1,
    data_for_history.api_class t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
  AND (
        t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
  )
`
export const deleteSql = `
  WITH tw1 AS (
    SELECT fk_profile, fk_project, enabled, tmsp_last_modification
    FROM projects.dfh_profile_proj_rel
    WHERE enabled = false
    AND tmsp_last_modification >= $1
  )
  SELECT DISTINCT
    dfh_pk_class "pkClass",
    fk_project "fkProject"
  FROM
    tw1 t1,
    data_for_history.api_class t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
`


