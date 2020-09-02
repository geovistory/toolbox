import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {pPropertyIdToString, stringToPPropertyId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {PClassFieldId} from '../aggregator-ds/p-class-field-label/PClassFieldLabelService';
export interface PPropertyId {fkProject: number, pkProperty: number}

export class PPropertyService extends PrimaryDataService<InitItem, PPropertyId, ProjectProperty>{

  measure = 1000;


  index = new IndexDBGeneric<PPropertyId, ProjectProperty>(pPropertyIdToString, stringToPPropertyId)

  constructor(public wh: Warehouse) {
    super(wh, [
      'modified_projects_project',
      'modified_projects_dfh_profile_proj_rel',
      'modified_data_for_history_api_property'
    ])

    /**
     * Add actions after a new ProjectProperty is put/updated into index
     */
    this.afterPut$.subscribe(item => {
      // Add update requests on aggregaters based on project property
      const outgoingField: PClassFieldId = {
        fkProject: item.key.fkProject,
        fkClass: item.val.fkDomain,
        fkProperty: item.val.fkProperty,
        isOutgoing: true
      }
      wh.agg.pClassFieldLabel.updater.addItemToQueue(outgoingField).catch(e => console.log(e))

      const incomingField: PClassFieldId = {
        fkProject: item.key.fkProject,
        fkClass: item.val.fkRange,
        fkProperty: item.val.fkProperty,
        isOutgoing: false
      }
      wh.agg.pClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
    })

    /**
    * Remove property preview from db
    */
    this.afterDel$.subscribe(item => {
    })


  }

  dbItemToKeyVal(item: InitItem): {key: PPropertyId; val: ProjectProperty;} {
    const key: PPropertyId = {
      pkProperty: item.fkProperty,
      fkProject: item.fkProject,
    };
    const val: ProjectProperty = item
    return {key, val}
  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql(tmsp: Date) {
    return deleteSql
  };
}


interface InitItem {
  fkProject: number,
  fkProperty: number,
  fkDomain: number
  fkRange: number
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
  SELECT DISTINCT
    dfh_pk_property "fkProperty",
    fk_project "fkProject",
    dfh_property_domain "fkDomain",
    dfh_property_range "fkRange"
  FROM
    tw1 t1,
    data_for_history.api_property t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
  AND (
        t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
  );
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
    fk_project "fkProject"
  FROM
    tw1 t1,
    data_for_history.api_property t2
  WHERE t1.fk_profile = t2.dfh_fk_profile;
`
export interface ProjectProperty {
  fkProperty: number
  fkProject: number,
  fkDomain: number
  fkRange: number
}



